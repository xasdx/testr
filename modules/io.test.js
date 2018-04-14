let { expect } = require("chai")
let { log } = require("../util")
let { type } = require("../matchers/type.matcher")
let { io } = require("./io.module")

let m = {
  addOne: n => n + 1,
  multiply: (n, m) => n * m
}

module.exports = {
  "io.module": {
    "verifiesOutputForAnInput": () => {
      let ioResult = io(9, 10).execute(m.addOne)
      expect(ioResult.success).to.be.true
      expect(ioResult.moduleType).to.equal("io")
      expect(ioResult.meta.input[0]).to.equal(9)
      expect(ioResult.meta.output.expected).to.equal(10)
      expect(ioResult.meta.output.actual).to.equal(10)
    },
    "rejectsIncorrectResults": () => {
      let ioResult = io(9, 11).execute(m.addOne)
      expect(ioResult.success).to.be.false
    },
    "handlesMultipleInputs": () => {
      let ioResult = io(4, 3, 12).execute(m.multiply)
      expect(ioResult.success).to.be.true
    },
    "executesTypeMatchers": () => {
      let ioResult = io(4, type.number).execute(m.addOne)
      let otherIoResult = io(4, type.boolean).execute(m.addOne)
      expect(ioResult.success).to.be.true
      expect(ioResult.meta.output.expected.matcherType).to.equal("type")
      expect(otherIoResult.success).to.be.false
    }
  }
}
