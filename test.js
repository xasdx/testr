let { expect } = require("chai")
let { testr } = require(".")

class InvocationCouter {

  constructor() {
    this.invocations = 0
  }

  getFunction() {
    return () => this.invocations += 1
  }
}

module.exports = {
  "testr": {
    "executesTestCases": () => {
      let counter = new InvocationCouter()
      testr({
        testCase: counter.getFunction(),
        otherTestCase: counter.getFunction()
      })
      expect(counter.invocations).to.equal(2)
    }
  }
}
