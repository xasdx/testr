let { inspect } = require("util")

let forEachProperty = (obj, f) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      f(prop, obj[prop])
    }
  }
}

let log = obj => console.log(inspect(obj, false, null))

let isFunction = f => typeof f === "function"

module.exports = { forEachProperty, log, isFunction }
