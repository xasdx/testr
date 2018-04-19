let TYPE = "called"

let called = (double, { times, inputs }) => {
  return { matcherType: TYPE, matches: f => {
    let timesMatch = times ? double.invocations.length === times : true
    let inputsMatch = true
    return timesMatch && inputsMatch
  }, toString: () => `an interaction with ${double.name}` }
}

module.exports = { called }
