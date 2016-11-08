//mars.js

/* ROVER */

function Rover(x, y, face, maxX, maxY) {
  this.x = x
  this.y = y
  this.face = face
  this.maxX = maxX
  this.maxY = maxY
  this.faces = ['N', 'E', 'S', 'W']
  this.turnLeft = function () {
    var faceIdx = this.faces.indexOf(this.face)
    if (faceIdx > 0) {
      this.face = this.faces[--faceIdx]
    } else {
      this.face = this.faces[this.faces.length-1]
    }
  }
  this.turnRight = function () {
    var faceIdx = this.faces.indexOf(this.face)
    if (faceIdx < this.faces.length-1) {
      this.face = this.faces[++faceIdx]
    } else {
      this.face = this.faces[0]
    }
  }
  this.move = function () {
    switch (this.face) {
      case 'N': if (this.y < this.maxY) { this.y++ };break;
      case 'E': if (this.x < this.maxX) { this.x++ };break;
      case 'S': if (this.y > 0) { this.y-- };break;
      case 'W': if (this.x > 0) { this.x-- };break;
    }
  }
  this.toString = function () {
    return [this.x, this.y, this.face].join(' ')
  }
}

/* DEPLOY */

var deployRovers = function (input) {
  if (!input) { return }
  var outputLines = []
  var inputLines = input.split('\n')
  var gridSize = inputLines[0].split(' ')
  var maxX = gridSize[0]
  var maxY = gridSize[1]

  for (var i=1; i<inputLines.length; i=i+2) {
    var roverPosition = inputLines[i].split(' ')
    var rover = new Rover(roverPosition[0], roverPosition[1], roverPosition[2], maxX, maxY)

    if (inputLines[i+1] === undefined) { return 'invalid input' }
    var path = inputLines[i+1].split('')
    $.each(path, function(idx, instr) {
      if (instr === 'L') { // rotate left
        rover.turnLeft()
      } else if (instr === 'R') { // rotate right
        rover.turnRight()
      } else if (instr === 'M') { // move
        rover.move()
      }
    })
    outputLines.push(rover.toString())
  }
  return outputLines.join('\n')
}