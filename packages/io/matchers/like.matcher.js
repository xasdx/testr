let { containsProperties } = require("../../common")

let TYPE = "like"

let like = expectedObj => ({
  matcherType: TYPE,
  matches: f => containsProperties(expectedObj, f()),
  toString: () => `an object like ${JSON.stringify(expectedObj)}`
})

module.exports = { like }
