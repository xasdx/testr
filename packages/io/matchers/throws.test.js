let { expect } = require("chai")
let { throws, throwsLike } = require("./throws.matcher")

let throwingFunction = () => { throw new Error("Something very bad happened") }
let notThrowingFunction = () => {}

module.exports = {
  "throws.matcher": {
    "matchesThrowingFunctionality": () => {
      expect(throws.matcherType).to.equal("throws")
      expect(throws.matches(throwingFunction)).to.be.true
      expect(throws.toString()).to.equal("an Error")
    },
    "rejectsNotThrowingFunctionality": () => {
      expect(throws.matches(notThrowingFunction)).to.be.false
    },
    "matchesErrorMessage": () => {
      let result = throwsLike(/bad happened/i).matches(throwingFunction)
      expect(result).to.be.true
    },
    "rejectsMismatchingErrorMessage": () => {
      let result = throwsLike(/stuff happened/i).matches(throwingFunction)
      expect(result).to.be.false
    }
  }
}
