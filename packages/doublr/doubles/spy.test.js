let { expect } = require("chai")
let { spy } = require("./spy.double")

let obj = { add: (a, b) => a + b, increase: n => n + 1 }

module.exports = {
  "spy.double": {
    "wrapsAnObject": () => {
      let objSpy = spy(obj)
      expect(objSpy.add(3, 2)).to.equal(5)
    },
    "tracksInvocations": () => {
      let objSpy = spy(obj)
      objSpy.add(3, 2)
      objSpy.add(5, 6)
      objSpy.increase(-2)
      expect(objSpy.add.invocations.length).to.equal(2)
      expect(objSpy.add.invocations[0].in).to.deep.equal([3, 2])
      expect(objSpy.add.invocations[1].in).to.deep.equal([5, 6])
      expect(objSpy.increase.invocations.length).to.equal(1)
      expect(objSpy.increase.invocations[0].in).to.deep.equal([-2])
    }
  }
}
