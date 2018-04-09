let reportToConsole = result => console.log(`[${result.testName}] ${result.failedAssertions.length === 0 ? "ok" : "not good"}`)

let defaultReporter = results => results.forEach(result => reportToConsole(result))

module.exports = { defaultReporter }
