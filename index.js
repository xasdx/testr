let forEachProperty = (obj, f) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      f(prop, obj[prop])
    }
  }
}

let testr = suite => forEachProperty(suite, (testName, test) => test())

module.exports = { testr }
