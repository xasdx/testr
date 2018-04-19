let { expect } = require("chai")
let { like } = require("../../matchers/like.matcher")

module.exports = {
  "like.matcher": {
    "matchesAnObjectContainingSpecificProperties": () => {
      let matcher = like({ name: "paul", age: 13 })
      expect(matcher.matcherType).to.equal("like")
      expect(matcher.matches(() => ({ name: "paul", age: 13 }))).to.be.true
      expect(matcher.matches(() => ({ name: "paul", age: 13, cool: true }))).to.be.true
      expect(matcher.matches(() => ({ name: "paul" }))).to.be.false
      expect(matcher.matches(() => ({}))).to.be.false
      expect(matcher.matches(() => "")).to.be.false
      expect(matcher.matches(() => 0)).to.be.false
      expect(matcher.toString()).to.have.string("an object like")
    }
  }
}
