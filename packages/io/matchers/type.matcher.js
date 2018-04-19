let { is } = require("../../common")

let TYPE = "type"

let typeMatcher = (matcher, toString) => ({ matcherType: TYPE, matches: f => matcher(f()), toString })

let type = {
  boolean: typeMatcher(is.boolean, () => "a boolean value"),
  number: typeMatcher(is.number, () => "a numeric value")
}

module.exports = { type }
