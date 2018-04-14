let { expect } = require("chai")
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
    },
    "rejectsIncorrectResults": () => {
      let ioResult = io(9, 11).execute(m.addOne)
      expect(ioResult.success).to.be.false
    },
    "handlesMultipleInputs": () => {
      let ioResult = io(4, 3, 12).execute(m.multiply)
      expect(ioResult.success).to.be.true
    }
  }
}
