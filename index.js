let forEachProperty = (obj, f) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      f(prop, obj[prop])
    }
  }
}

let unit = targetUnit => {
  return {
    specs: specifications => {
      forEachProperty(targetUnit, (property, cases) => {
        if (!targetUnit[property]) { throw Error() }
      })
    }
  }
}

module.exports = { unit }
