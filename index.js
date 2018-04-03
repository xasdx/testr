let R = require("ramda")
let { defaultReporter } = require("./reporter")

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
