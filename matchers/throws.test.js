let { expect } = require("chai")
let { throws } = require("./throws.matcher")

let throwingFunction = () => { throw new Error() }
let notThrowingFunction = () => {}

module.exports = {
  "throws.matcher": {
    "matchesThrowingFunctionality": () => {
      expect(throws.matcherType).to.equal("throws")
      expect(throws.matches(throwingFunction)).to.be.true
      expect(throws.toString).to.equal("an Error")
    },
    "rejectsNotThrowingFunctionality": () => {
      expect(throws.matches(notThrowingFunction)).to.be.false
    }
  }
}
