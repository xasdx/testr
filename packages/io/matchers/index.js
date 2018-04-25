let { called } = require("./called.matcher")
let { like } = require("./like.matcher")
let { exactly } = require("./exactly.matcher")
let { throws } = require("./throws.matcher")
let { type } = require("./type.matcher")

module.exports = { called, like, throws, type }
