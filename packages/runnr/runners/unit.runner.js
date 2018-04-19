let { forEachProperty, is } = require("@testr/common")

let assertFunctionality = (functionality, property) => {
  if (!functionality) { throw new Error(`[testr] non-existing property '${property}'`) }
  if (!is.function(functionality)) { throw new Error(`[testr] '${property}' must be a function`) }
}

let processSpecifications = (targetUnit, specifications) => {
  let specsRunResults = []

  forEachProperty(specifications, (property, testCases) => {
    let functionality = targetUnit[property]
    assertFunctionality(functionality, property)

    if (is.array(testCases)) {
      let propCaseResults = testCases.map(testCase => testCase.execute(functionality))
      specsRunResults.push({ property, results: propCaseResults })
    } else {
      throw new Error("[testr] test cases must be specified in an array")
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
