let { expect } = require("chai")
let { type } = require("./type.matcher")

module.exports = {
  "type.matcher": {
    "matchesBooleans": () => {
      let matcher = type.boolean
      expect(matcher.matcherType).to.equal("type")
      expect(matcher.matches(() => true)).to.be.true
      expect(matcher.matches(() => "true")).to.be.false
      expect(matcher.matches(() => "")).to.be.false
      expect(matcher.matches(() => 0)).to.be.false
      expect(matcher.toString()).to.equal("a boolean value")
    },
    "matchesNumbers": () => {
      let matcher = type.number
      expect(matcher.matcherType).to.equal("type")
      expect(matcher.matches(() => 1)).to.be.true
      expect(matcher.matches(() => "")).to.be.false
      expect(matcher.matches(() => "2")).to.be.false
      expect(matcher.matches(() => true)).to.be.false
      expect(matcher.toString()).to.equal("a numeric value")      
    }
  }
}
