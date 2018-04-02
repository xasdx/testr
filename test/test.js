let { expect } = require("chai")
let { testr } = require("..")
let { InvocationCouter } = require("./util")

module.exports = {
  "testr": {

    "executesTestCases": () => {
      let counter = new InvocationCouter()
      testr({
        testCase: counter.onFunction(),
        otherTestCase: counter.onFunction()
      })
      expect(counter.invocations).to.equal(2)
    }
  }
}
