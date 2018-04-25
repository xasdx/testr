let { collectProperties } = require("../../common")

let TYPE = "exactly"

let isExactlyLike = (expectedObj, obj) => {
  let expectedProps = collectProperties(expectedObj)
  let actualProps = collectProperties(obj)
  if (expectedProps.length !== actualProps.length) { return false }
  return expectedProps.filter(({ key, value }) => value !== obj[key]).length === 0
}

let exactly = expectedObj => {
  return { matcherType: TYPE, matches: f => isExactlyLike(expectedObj, f()), toString: () => `an object exactly like ${JSON.stringify(expectedObj)}` }
}

module.exports = { exactly }
