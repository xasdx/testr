let { inspect } = require("util")

let forEachProperty = (obj, f) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      f(prop, obj[prop])
    }
  }
}

let log = obj => console.log(inspect(obj, false, null))

let isFunction = obj => typeof obj === "function"

let isBoolean = obj => typeof obj === "boolean"

let isNumber = obj => typeof obj === "number"

let isArray = obj => Array.isArray(obj)

module.exports = {
  forEachProperty,
  log,
  is: {
    function: isFunction,
    array: isArray,
    boolean: isBoolean,
    number: isNumber
  }
}
