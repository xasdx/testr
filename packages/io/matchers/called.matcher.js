let { every } = require("../../common")

let TYPE = "called"

let doInputsMatch = (inputs, invocations) => every(inputs, (input, i) => invocations[i] === input)

let called = (double, { times, inputs }) => ({
  matcherType: TYPE,
  toString: () => `an interaction with ${double.name}`,
  matches: f => {
    let timesMatch = times ? double.invocations.length === times : true
    let inputsMatch = inputs ? doInputsMatch(inputs, double.invocations) : true
    return timesMatch && inputsMatch
  }
})

module.exports = { called }
