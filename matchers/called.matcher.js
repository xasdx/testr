let TYPE = "called"

let called = (double, { times, inputs }) => {
  return { matcherType: TYPE, matches: f => {
    let timesMatch = times ? double.invocations.length === times : true
    let inputMatch = true
    return timesMatch && inputMatch
  }, toString: () => `an interaction with ${double.name}` }
}

module.exports = { called }
