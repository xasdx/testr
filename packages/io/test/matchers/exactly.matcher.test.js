let { expect } = require("chai")
let { exactly } = require("../../matchers/exactly.matcher")

module.exports = {
  "exactly.matcher": {
    "matchesAnObjectToContainExcatlyTheSpecificProperties": () => {
      let matcher = exactly({ name: "paul", age: 13 })
      expect(matcher.matcherType).to.equal("exactly")
      expect(matcher.matches(() => ({ name: "paul", age: 13 }))).to.be.true
      expect(matcher.matches(() => ({ name: "pauL", age: 13 }))).to.be.false
      expect(matcher.matches(() => ({ name: "paul", age: 13, cool: true }))).to.be.false
      expect(matcher.matches(() => ({ name: "paul" }))).to.be.false
      expect(matcher.matches(() => ({}))).to.be.false
      expect(matcher.matches(() => "")).to.be.false
      expect(matcher.matches(() => 0)).to.be.false
      expect(matcher.toString()).to.have.string("an object exactly like")
    }
  }
}
