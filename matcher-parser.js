let matcherFactory = require("./matcher-factory")
let matchers = require("./matchers")
let modifiers = require("./modifiers")

let ignoredTokens = ["to"]

let tokenizeCamelCase = str => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase().split("-")

let assembleModifierPipe = operatorTokens => operatorTokens.filter(op => !ignoredTokens.includes(op))
                                                           .map(op => modifiers[op])

let parseMatcher = matcherDescription => {
  let matcherTokens = tokenizeCamelCase(matcherDescription).reverse()
  let [matcherToken, ...operatorTokens] = matcherTokens
  return expectedValue => actualValue => matcherFactory(
    expectedValue,
    actualValue,
    matchers[matcherToken],
    `Expected "${actualValue} ${matcherTokens.join(" ")} ${expectedValue}".`,
    assembleModifierPipe(operatorTokens)
  )
}

module.exports = { parseMatcher }
