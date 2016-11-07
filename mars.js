//mars.js

/* FACES */
var faces = ['N', 'E', 'S', 'W']
var rightFace = function (face) {
  var faceIdx = faces.indexOf(face)
  if (faceIdx < faces.length-1) {
    return faces[++faceIdx]
  } else {
    return faces[0]
  }
}
var leftFace = function (face) {
  var faceIdx = faces.indexOf(face)
  if (faceIdx > 0) {
    return faces[--faceIdx]
  } else {
    return faces[faces.length-1]
  }
}

var move = function (x, y, face) {
  switch (face) {
    case 'N': y++;break;
    case 'E': x++;break;
    case 'S': y--;break;
    case 'W': x--;break;
  }
  return [x, y]
}

var deployRovers = function (input) {
  var outputLines = []
  var inputLines = input.split('\n')
  if (!inputLines || inputLines.length < 3) {
    return 'ERROR'
  }
  var gridSize = inputLines[0].split(' ')
  var maxX = gridSize[0]
  var maxY = gridSize[1]

  for (var i=1; i<inputLines.length; i=i+2) {
    var roverPosition = inputLines[i].split(' ')
    var roverX = roverPosition[0]
    var roverY = roverPosition[1]
    var roverFace = roverPosition[2]

    var path = inputLines[i+1].split('')
    $.each(path, function(idx, instr) {
      if (instr === 'L') { // rotate left
        roverFace = leftFace(roverFace)
      } else if (instr === 'R') { // rotate right
        roverFace = rightFace(roverFace)
      } else if (instr === 'M') { // move
        var newXY = move(roverX, roverY, roverFace)
        roverX = newXY[0]
        roverY = newXY[1]
      }
    })
    outputLines.push([roverX, roverY, roverFace].join(' '))
  }
  return outputLines.join('\n')
}