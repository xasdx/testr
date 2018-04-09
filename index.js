let { defaultReporter } = require("./reporter")
let { parseMatcher } = require("./matcher-parser")

let assertions = []

let forEachProperty = (obj, f) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      f(prop, obj[prop])
    }
  }
}

let expect = value => new Proxy({}, {
  get: (target, name) => {
    return expected => assertions.push({ matcher: parseMatcher(name)(expected), value })
  }
})

let processTestCase = (testName, test) => {
  
  test({ expect })
  
  let failedAssertions = assertions.map(assertion => assertion.matcher(assertion.value))
                                   .filter(assertionResult => {
                                     let matchResult = assertionResult.match
                                     return !assertionResult.modifiers.reduce((prev, mod) => mod(prev), matchResult)
                                   })
                                   .map(assertionResult => assertionResult.fail)
  
  return {
    testName,
    failedAssertions
  }
}

let configureRunner = ({ reporter }) => suite => {
  let testResults = []
  forEachProperty(suite, (testName, test) => testResults.push(processTestCase(testName, test)))
  let testReporter = reporter || defaultReporter
  testReporter(testResults)
}

module.exports = {
  testr: configureRunner({ reporter: defaultReporter }),
  configure: configureRunner
}
