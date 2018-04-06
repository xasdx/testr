let R = require("ramda")
let { defaultReporter } = require("./reporter")
let { parseMatcher } = require("./matcher-parser")

let assertions = []

let expect = value => new Proxy({}, {
  get: (target, name) => {
    return expected => assertions.push({ matcher: parseMatcher(name)(expected), value })
  }
})

let processTestCase = ([testName, test]) => {
  
  test({ expect })
  
  let collectFailedAssertions = R.pipe(
    R.map(assertion => assertion.matcher(assertion.value)),
    R.filter(assertionResult => {
      let matchResult = assertionResult.match
      return !assertionResult.modifiers.reduce((prev, mod) => mod(prev), matchResult)
    }),
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
