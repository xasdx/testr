let { expect } = require("chai")
let { called } = require("../../matchers/called.matcher")
// let { spy } = require("../doubles/spy.double")

module.exports = {
  "called.matcher": {
    "assertsThatASpyWasCalledNTimes": () => {
      // let spyObj = spy({ f: () => {} })
      // spyObj.f()
      // spyObj.f()
      // expect(called(spyObj.f, { times: 2 }).matches()).to.be.true
    }
  }
}
