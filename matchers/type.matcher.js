let { is } = require("../util")

let TYPE = "type"

let typeMatcher = matches => ({ matcherType: TYPE, matches })

let type = {
  boolean: typeMatcher(is.boolean),
  number: typeMatcher(is.number)
}

module.exports = { type }
