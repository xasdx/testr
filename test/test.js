let { expect } = require("chai")
let { testr, configure } = require("..")
let { InvocationCouter, CustomTestReporter } = require("./util")

module.exports = {
  
  "testr": {

    "executesTestCases": () => {
      let counter = new InvocationCouter()
      testr({
        testCase: counter.onFunction(),
        otherTestCase: counter.onFunction()
      })
      expect(counter.invocations).to.equal(2)
    },
    
    "registersCustomReporters": () => {
      let reporter = new CustomTestReporter()
      let testr = configure({ reporter: reporter.reporterFunction() })
      testr({
        testCase: () => {},
        otherTestCase: () => {}
      })
      expect(reporter.report).to.have.lengthOf(2)
      expect(reporter.report[0].testName).to.equal("testCase")
      expect(reporter.report[1].testName).to.equal("otherTestCase")
      expect(reporter.report[0]).to.have.a.property("failedAssertions")
      expect(reporter.report[1]).to.have.a.property("failedAssertions")
    },
    
    "processesAssertions": () => {
      let reporter = new CustomTestReporter()
      let testr = configure({ reporter: reporter.reporterFunction() })
      testr({
        testCase: _ => {
          _.assert("actual", _.to.equal("expected"))
          _.assert("value", _.to.equal("value"))
          _.assert("otherActual", _.to.equal("otherExpected"))
        }
      })
      expect(reporter.report[0].failedAssertions).to.have.lengthOf(2)
      expect(reporter.report[0].failedAssertions[0]).to.contain("actual")
      expect(reporter.report[0].failedAssertions[0]).to.contain("expected")
      expect(reporter.report[0].failedAssertions[1]).to.contain("otherActual")
      expect(reporter.report[0].failedAssertions[1]).to.contain("otherExpected")
    }
  }
}
