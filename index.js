let R = require("ramda")

module.exports = {
  testr: R.forEachObjIndexed((test, _) => test())
}
