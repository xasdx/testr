let R = require("ramda")

let reportToConsole = result => console.log(`[${result.testName}] ${R.empty(result.failedAssertions) ? "ok" : "not good"}`)

let defaultReporter = R.forEach(reportToConsole)

module.exports = { defaultReporter }
