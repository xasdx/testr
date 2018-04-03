let R = require("ramda")

let reportToConsole = result => console.log(`[${result.testName}] ${R.isNil(result.failedAssertions) ? "ok" : "not good"}`)

let defaultReporter = R.forEach(reportToConsole)

let processTestCase = ([testName, test]) => {
  test()
  return { testName, failedAssertions: null }
}

let configureRunner = ({ reporter }) => {
  let testReporter = reporter || defaultReporter
  return R.pipe(R.toPairs, R.map(processTestCase), testReporter)
}

module.exports = {
  testr: configureRunner({ reporter: defaultReporter }),
  configure: configureRunner
}
