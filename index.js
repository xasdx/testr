let R = require("ramda")
let { defaultReporter } = require("./reporter")

let equalToMatcher = expectedValue => {
  return value => {
    return {
      matching: expectedValue === value,
      describeFail: `Expected "${value}" (actual) to equal "${expectedValue}".`
    }
  }
}

let to = {
  equal: equalToMatcher
}

let assertions = []

let assert = (value, matcher) => assertions.push({ matcher, value })

let processTestCase = ([testName, test]) => {
  test({ assert, to })
  let results = assertions.map(assertion => assertion.matcher(assertion.value))
                          .filter(assertionResult => !assertionResult.matching)
                          .map(assertionResult => assertionResult.describeFail)
  return { testName, results }
}

let configureRunner = ({ reporter }) => {
  let testReporter = reporter || defaultReporter
  return R.pipe(R.toPairs, R.map(processTestCase), testReporter)
}

module.exports = {
  testr: configureRunner({ reporter: defaultReporter }),
  configure: configureRunner
}
