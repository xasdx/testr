let { expect } = require("chai")
let { unit } = require("..")

let m = {
  addOne: n => n + 1
}

module.exports = {
  
  "testr": {
    "verifiesInterface": () => {
      expect(() => unit(m).specs({ addTwo: true })).to.throw(/non-existing/i)
    }
  }
}
