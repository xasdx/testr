let { expect } = require("chai")
let { unit } = require("..")

let m = {
  addOne: n => n + 1
}

module.exports = {
  
  "testr": {

    "verifiesInterface": () => {
      unit(m).specs({ addOne: true })
    }
  }
}
