let R = require("ramda")
let { defaultReporter } = require("./reporter")
let { to } = require("./matchers")

let assertions = []

let assert = (value, matcher) => assertions.push({ matcher, value })

let processTestCase = ([testName, test]) => {
  test({ assert, to })
  let results = assertions.map(assertion => assertion.matcher(assertion.value))
                          .filter(assertionResult => !assertionResult.match)
                          .map(assertionResult => assertionResult.fail)
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
