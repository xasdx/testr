let R = require("ramda")

let processTestCase = ([testName, test]) => {
  test()
  return { testName, failedAssertions: null }
}

let reportCase = testCase => console.log(`[${testCase.testName}] ${R.isNil(testCase.failedAssertions) ? "ok" : "not good"}`)

module.exports = {
  testr: R.pipe(R.toPairs, R.map(processTestCase), R.forEach(reportCase))
}
