let { forEachProperty } = require("./util")

let processSpecifications = (targetUnit, specifications) => {

  let specsRunResults = []

  forEachProperty(specifications, (property, testCases) => {
    let functionality = targetUnit[property]
    if (!functionality) { throw new Error(`Non-existing property '${property}'`) }
    if (typeof functionality !== "function") { throw new Error(`'${property}' must be a function`) }

    if (Array.isArray(testCases)) {
      let propCaseResults = testCases.map(testCase => testCase(functionality))
      specsRunResults.push({ property, results: propCaseResults })
    } else {
      throw new Error("Test cases must be specified in an array")
    }
  })

  return specsRunResults
}

let unit = targetUnit => {
  return {
    specs: specs => processSpecifications(targetUnit, specs)
  }
}

module.exports = { unit }
