let { expect } = require("chai")
let { called } = require("../../matchers/called.matcher")

module.exports = {
  "called.matcher": {
    "assertsThatASpyWasCalledNTimes": () => {
      let spyObj = { f: { invocations: [0, 0] } }
      expect(called(spyObj.f, { times: 2 }).matches()).to.be.true
    },
    "assertsThatASpyWasCalledWithCertainInputArguments": () => {
      let spyObj = { f: { invocations: [0, true] } }
      expect(called(spyObj.f, { times: 2, inputs: [0, true] }).matches()).to.be.true
      expect(called(spyObj.f, { inputs: [1, true] }).matches()).to.be.false
      expect(called(spyObj.f, { inputs: [0, "true"] }).matches()).to.be.false
    }
  }
}
