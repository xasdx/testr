let { forEachProperty, is } = require("../util")

let spy = obj => {
  let spyObject = {}
  forEachProperty(obj, (key, value) => {
    if (is.function(value)) {
      let invocations = []
      let spiedFunction = function () {
        invocations.push({ in: [...arguments] })
        return value(...arguments)
      }
      spiedFunction.invocations = invocations
      spyObject[key] = spiedFunction
    }
  })
  return spyObject
}

module.exports = { spy }
