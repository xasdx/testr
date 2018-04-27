let { expect } = require("chai")

let { unit } = require("../packages/runnr")
let { io, matchers } = require("../packages/io")
let { reporter } = require("../packages/reportr")
let { spy } = require("../packages/doublr")

let { type, throws, like, exactly, called } = matchers

let TestModule = require("./test.module")

let userService = {
  find: () => ({ name: "paul" })
}

let userServiceSpy = spy(userService)

let m = new TestModule(userServiceSpy)

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
        ],
        subtractTwo: [
          io(5, [
            type.number,
            3,
            throws,
            n => n % 2 === 0
          ])
        ]
      })
      expect(results).to.have.lengthOf(3)
      expect(results[0].results).to.have.lengthOf(3)
      expect(results[0].results[0].success).to.be.true
      expect(results[0].results[1].success).to.be.false
      expect(results[0].results[2].success).to.be.false
      expect(results[1].results).to.have.lengthOf(2)
      expect(results[1].results[0].success).to.be.true
      expect(results[1].results[1].success).to.be.false
      expect(results[2].results).to.have.lengthOf(4)
      expect(results[2].results[0].success).to.be.true
      expect(results[2].results[1].success).to.be.true
      expect(results[2].results[2].success).to.be.false
      expect(results[2].results[3].success).to.be.false
    },
    "assertsTestDoubleInteractions": () => {
      let results = unit(m).specs({
        findUser: [
          io({}, called(userServiceSpy.find))
        ]
      })
      expect(results).to.have.lengthOf(1)
      expect(results[0].results).to.have.lengthOf(1)
      expect(results[0].results[0].success).to.be.true
    }
  }
}
