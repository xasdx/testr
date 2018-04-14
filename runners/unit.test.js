let { expect } = require("chai")
let { unit } = require("./unit.runner")

module.exports = {
  "unit.runner": {
    "verifiesInterface": () => {
      expect(() => unit({}).specs({ addTwo: [] })).to.throw(/non-existing/i)
    }
  }
}
