// samples
// assert.ok( 1 == "1", "Passed!" )
// assert.equal( 2*2*2, 8)
// assert.deepEqual([['oi',2]], [['oi',2]])

/* invalid inputs */
QUnit.test('empty input', function(assert) {
  var input = ''
  var expectedOutput = 'ERROR'
  assert.equal(deployRovers(input), expectedOutput)
})

/* valid inputs */
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

/* faces */
QUnit.test('right face N', function(assert) {
  assert.equal(rightFace('N'), 'E')
})

QUnit.test('right face W', function(assert) {
  assert.equal(rightFace('W'), 'N')
})

QUnit.test('left face S', function(assert) {
  assert.equal(leftFace('S'), 'E')
})

QUnit.test('left face N', function(assert) {
  assert.equal(leftFace('N'), 'W')
})

/* movements */
QUnit.test('move N', function(assert) {
  var expectedOutput = [0, 1]
  assert.deepEqual(move(0, 0, 'N'), expectedOutput)
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