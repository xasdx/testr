let { collectProperties, containsProperties } = require("../../common")

let TYPE = "exactly"

let hasSameNumberOfProperties = (obj, otherObj) => {
  let objProps = collectProperties(obj)
  let otherObjProps = collectProperties(otherObj)
  return objProps.length === otherObjProps.length
}

let isExactlyLike = (expectedObj, obj) => hasSameNumberOfProperties(expectedObj, obj) &&
                                          containsProperties(expectedObj, obj)

let exactly = expectedObj => ({
  matcherType: TYPE,
  matches: f => isExactlyLike(expectedObj, f()),
  toString: () => `an object exactly like ${JSON.stringify(expectedObj)}`
})

module.exports = { exactly }
