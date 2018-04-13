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
      forEachProperty(specifications, (property, cases) => {
        if (!targetUnit[property]) { throw new Error(`Non-existing property ${property}`) }
      })
    }
  }
}

module.exports = { unit }
