let { expect } = require("chai")
let { log } = require("./util")
let { unit, io, type, throws, like, report } = require(".")

let m = {
  addOne: n => n + 1,
  subtractTwo: n => n - 2,
  findUser: () => ({ name: "paul" })
}

module.exports = {
  "testr": {
    "verifiesInterfaces": () => {
      expect(() => unit({}).specs({ addTwo: [] })).to.throw(/non-existing/i)
    },
    "collectsTestCases": () => {
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
    "evaluatesCases": () => {
      let results = unit(m).specs({
        addOne: [io(1, 2), io(9, 15)],
        subtractTwo: []
      })
      expect(results).to.have.lengthOf(2)
      expect(results[0].results).to.have.lengthOf(2)
      expect(results[0].results[0].success).to.be.true
      expect(results[0].results[1].success).to.be.false
      expect(results[1].results).to.be.empty
    },
    "evaluatesCasesWithMatchers": () => {
      let results = unit(m).specs({
        addOne: [
          io(1, type.number),
          io(1, type.boolean),
          io(0, throws)
        ],
        findUser: [
          io({}, like({ name: "paul" })),
          io({}, like({ name: "paul", age: 13 }))
        ]
      })
      expect(results).to.have.lengthOf(2)
      expect(results[0].results).to.have.lengthOf(3)
      expect(results[0].results[0].success).to.be.true
      expect(results[0].results[1].success).to.be.false
      expect(results[0].results[2].success).to.be.false
      expect(results[1].results).to.have.lengthOf(2)
      expect(results[1].results[0].success).to.be.true
      expect(results[1].results[1].success).to.be.false
      // report({ results })
    }
  }
}
