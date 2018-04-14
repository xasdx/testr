let { is } = require("../util")

let TYPE = "type"

let typeMatcher = (matches, toString) => ({ matcherType: TYPE, matches, toString })

let type = {
  boolean: typeMatcher(is.boolean, () => "a boolean value"),
  number: typeMatcher(is.number, () => "a number value")
}

module.exports = { type }
