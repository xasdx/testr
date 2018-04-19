let { collectProperties } = require("@testr/common")

let TYPE = "like"

let isLike = (expectedObj, obj) => collectProperties(expectedObj).filter(({ key, value }) => value !== obj[key]).length === 0

let like = expectedObj => {
  return { matcherType: TYPE, matches: f => isLike(expectedObj, f()), toString: () => `an object like ${JSON.stringify(expectedObj)}` }
}

module.exports = { like }
