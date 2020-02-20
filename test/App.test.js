const chai = require('chai')
const assert = chai.assert

const AppClass = require('../src/components/App')
const App = new AppClass.default

suite('Unit Tests', function () {
  suite('Function getSecs(hours, mins, secs)', function () {
    test('Valid values', function (done) {
      assert.equal(App.getSecs(4, 3, 2), 14582)
      done()
    })
  })

  suite('roundTo2(num)', function () {
    test('Valid values', function (done) {
      assert.equal(App.roundTo2(4), 4)
      assert.equal(App.roundTo2(4.0), 4)
      assert.equal(App.roundTo2(4.10), 4.1)
      assert.equal(App.roundTo2(4.155), 4.16)
      done()
    })
  })

  suite('getHoursMinsSecs(timeSecs)', function () {
    test('Valid values', function (done) {
      assert.equal(App.getHoursMinsSecs(14582).hours, 4)
      assert.equal(App.getHoursMinsSecs(14582).mins, 3)
      assert.equal(App.getHoursMinsSecs(14582).secs, 2)
      done()
    })
  })
})