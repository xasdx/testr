let R = require("ramda")
let { defaultReporter } = require("./reporter")
let { to } = require("./matchers")

let assertions = []

let assert = (value, matcher) => assertions.push({ matcher, value })

let processTestCase = ([testName, test]) => {
  test({ assert, to })
  
  let collectFailedAssertions = R.pipe(
    R.map(assertion => assertion.matcher(assertion.value)),
    R.filter(assertionResult => !assertionResult.match),
    R.map(assertionResult => assertionResult.fail)
  )
  
  return {
    testName,
    failedAssertions: collectFailedAssertions(assertions)
  }
}

let configureRunner = ({ reporter }) => R.pipe(
  R.toPairs,
  R.map(processTestCase),
  reporter || defaultReporter
)

module.exports = {
  testr: configureRunner({ reporter: defaultReporter }),
  configure: configureRunner
}
