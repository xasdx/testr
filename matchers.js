let R = require("ramda")

let matcher = (expected, actual, matcher, failureDescription) => {
  return {
    match: matcher(expected, actual),
    fail: failureDescription(expected, actual),
    actual,
    expected
  }
}

let equalToMatcher = R.curry((expectedValue, value) => matcher(
  expectedValue,
  value,
  (expected, actual) => expectedValue === value,
  (expected, actual) => `Expected "${actual}" to equal "${expected}".`
))

module.exports = {
  to: {
    equal: equalToMatcher
  }
}
