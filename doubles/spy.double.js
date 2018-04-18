let { collectProperties, is } = require("../util")

let spyFunction = f => {
  let invocations = []
  let spiedFunction = function () {
    invocations.push({ in: [...arguments] })
    return f(...arguments)
  }
  spiedFunction.invocations = invocations
  return spiedFunction
}

let mergeProperties = (acc, current) => {
  if (current.value) {
    acc[current.key] = current.value
  }
  return acc
}

let spy = obj => collectProperties(obj).map(({ key, value }) => is.function(value) ? { key: key, value: spyFunction(value) } : {})
                               .reduce(mergeProperties, {})

module.exports = { spy }
