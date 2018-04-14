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

let isArray = obj => Array.isArray(obj)

module.exports = { forEachProperty, log, is: { function: isFunction, array: isArray } }
