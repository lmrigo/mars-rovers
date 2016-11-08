//mars.js

/* ROVER */

function Rover(x, y, face, path, maxX, maxY) {
  this.x = x
  this.y = y
  this.face = face
  this.path = path
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
  this.move = function (occupiedPositions) {
    var newX = this.x
    var newY = this.y

    switch (this.face) {
      case 'N': if (this.y < this.maxY) { newY++ };break;
      case 'E': if (this.x < this.maxX) { newX++ };break;
      case 'S': if (this.y > 0) { newY-- };break;
      case 'W': if (this.x > 0) { newX-- };break;
    }

    var crash = false
    var thisOccupied // find this rover in the occupied positions
    if (occupiedPositions) {
      var self = this // scope workaround
      $.each(occupiedPositions, function (idx, occup) {
        if (self.x == occup.x && self.y == occup.y ) {
          thisOccupied = occup
        } else if (newX == occup.x && newY == occup.y) {
          crash = true
        }
      })
    }
    if (!crash) {
      this.x = newX
      this.y = newY
      if (thisOccupied) {
        // update the position in the occupied array
        thisOccupied.x = newX
        thisOccupied.y = newY
      }
    }
  }
  this.toString = function () {
    return [this.x, this.y, this.face].join(' ')
  }
}

/* DEPLOY */

var deployRovers = function (input) {
  if (!input) { return } // no input provided
  var outputLines = []
  var inputLines = input.split('\n')
  var gridSize = inputLines[0].split(' ')
  var maxX = parseInt(gridSize[0])
  var maxY = parseInt(gridSize[1])

  // read rovers and store
  var rovers = []
  for (var i=1; i<inputLines.length; i=i+2) {
    if (inputLines[i+1] === undefined) { return 'invalid input' }
    var roverPosition = inputLines[i].split(' ')
    var path = inputLines[i+1].split('')
    var rover = new Rover(parseInt(roverPosition[0]),
      parseInt(roverPosition[1]), roverPosition[2],
      path, maxX, maxY)
    rovers.push(rover)
  }

  // store positions occupied by other rovers
  var occupiedPositions = []
  $.each(rovers, function (idx, rov) {
    occupiedPositions.push({
      x: rov.x,
      y: rov.y
    })
  })

  $.each(rovers, function (ridx, rover) {
    $.each(rover.path, function(pidx, instr) {
      if (instr === 'L') { // rotate left
        rover.turnLeft()
      } else if (instr === 'R') { // rotate right
        rover.turnRight()
      } else if (instr === 'M') { // move
        rover.move(occupiedPositions)
      }
    })
    outputLines.push(rover.toString())
  })

  return outputLines.join('\n')
}