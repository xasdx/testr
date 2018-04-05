let R = require("ramda")

let ignoredTokens = ["to"]

let matcher = (expected, actual, matcher, failureDescription, operators) => {
  return {
    match: matcher(expected, actual),
    fail: failureDescription(expected, actual),
    actual,
    expected,
    operators: operators || []
  }
}

let matchers = {
  equal: (expected, actual) => expected === actual
}

let operators = {
  not: value => !value
}

let tokenizeCamelCase = str => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase().split("-")

module.exports = {
  combineMatchers: matcherDescription => {
    let matcherTokens = tokenizeCamelCase(matcherDescription).reverse()
    let [matcherToken, ...operatorTokens] = matcherTokens
    
    let operatorPipe = operatorTokens.filter(op => !ignoredTokens.includes(op))
                                    .map(op => operators[op])
    
    return R.curry((expectedValue, value) => matcher(
      expectedValue,
      value,
      matchers[matcherToken],
      (expected, actual) => `Expected "${actual} ${matcherTokens.join(" ")} ${expected}".`,
      operatorPipe
    ))
  }
}
