// samples
// assert.ok( 1 == "1", "Passed!" )
// assert.equal( 2*2*2, 8)
// assert.deepEqual([['oi',2]], [['oi',2]])

/* invalid inputs */
QUnit.test('empty input', function(assert) {
  assert.equal(deployRovers(), undefined)
  assert.equal(deployRovers(''), undefined)
})

QUnit.test('rover without instructions line', function(assert) {
    var input =
    '5 5\n' +
    '0 0 N'
  assert.equal(deployRovers(input), 'invalid input')
})

/* valid inputs */
QUnit.test('no rovers', function(assert) {
  var input = '3 3'
  assert.equal(deployRovers(input), '')
})

QUnit.test('rover with empty instructions', function(assert) {
    var input =
    '5 5\n' +
    '0 0 N\n' +
    ''
  assert.equal(deployRovers(input), '0 0 N')
})

QUnit.test('simple move north', function(assert) {
  var input =
    '5 5\n' +
    '0 0 N\n' +
    'M'
  var expectedOutput =
    '0 1 N'
  assert.equal(deployRovers(input), expectedOutput)
})

QUnit.test('sample test case', function(assert) {
  var input =
    '5 5\n' +
    '1 2 N\n' +
    'LMLMLMLMM\n' +
    '3 3 E\n'+
    'MMRMMRMRRM'
  var expectedOutput =
    '1 3 N\n' +
    '5 1 E'
  assert.equal(deployRovers(input), expectedOutput)
})

QUnit.test('sample test case', function(assert) {
  var input =
`5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`
  var expectedOutput =
`1 3 N
5 1 E`
  assert.equal(deployRovers(input), expectedOutput)
})

/* faces */
QUnit.test('right face N', function(assert) {
  var rov = new Rover(0, 0, 'N', 0, 0)
  rov.turnRight()
  assert.equal(rov.face, 'E')
})

QUnit.test('right face W', function(assert) {
  var rov = new Rover(0, 0, 'W', 0, 0)
  rov.turnRight()
  assert.equal(rov.face, 'N')
})

QUnit.test('left face S', function(assert) {
  var rov = new Rover(0, 0, 'S', 0, 0)
  rov.turnLeft()
  assert.equal(rov.face, 'E')
})

QUnit.test('left face N', function(assert) {
  var rov = new Rover(0, 0, 'N', 0, 0)
  rov.turnLeft()
  assert.equal(rov.face, 'W')
})

/* movements */
QUnit.test('move N', function(assert) {
  var rov = new Rover(0, 0, 'N', 1, 1)
  rov.move()
  var expectedOutput = [0, 1]
  assert.deepEqual([rov.x, rov.y], expectedOutput)
})

QUnit.test('move S invalid', function(assert) {
  var rov = new Rover(0, 0, 'S', 1, 1)
  rov.move()
  var expectedOutput = [0, 0]
  assert.deepEqual([rov.x, rov.y], expectedOutput)
})

QUnit.test('move W invalid', function(assert) {
  var rov = new Rover(0, 0, 'W', 1, 1)
  rov.move()
  var expectedOutput = [0, 0]
  assert.deepEqual([rov.x, rov.y], expectedOutput)
})


/* screen styling */
QUnit.done(function (details) {
  var body = document.getElementsByTagName('body')[0]
  if (details.failed > 0) {
    body.style = 'background-color: red;'
  } else {
    body.style = 'background-color: green;'
  }
})