let { expect } = require("chai")
let { log } = require("../util")
let { unit, io, report } = require("..")

let m = {
  addOne: n => n + 1,
  subtractTwo: n => n - 2
}

module.exports = {

  "testr": {

    "verifiesInterface": () => {
      expect(() => unit(m).specs({ addTwo: [] })).to.throw(/non-existing/i)
    },

    "collectsAssertions": () => {
      let results = unit(m).specs({
        addOne: [io(1, 2), io(9, 10)],
        subtractTwo: [io(6, 4)]
      })
      expect(results).to.have.lengthOf(2)
      expect(results[0].property).to.be.equal("addOne")
      expect(results[0].results).to.have.lengthOf(2)
      expect(results[1].property).to.be.equal("subtractTwo")
      expect(results[1].results).to.have.lengthOf(1)
    },

    "evaluatesAssertions": () => {
      let results = unit(m).specs({
        addOne: [io(1, 2), io(9, 15)],
        subtractTwo: []
      })
      report(results)
      expect(results).to.have.lengthOf(2)
      expect(results[0].results).to.have.lengthOf(2)
      expect(results[0].results[0].success).to.be.true
      expect(results[0].results[1].success).to.be.false
      expect(results[1].results).to.be.empty
    }
  }
}
