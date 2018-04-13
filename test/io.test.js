let { expect } = require("chai")
let { unit, io } = require("..")

let m = {
  addOne: n => n + 1,
  subtractTwo: n => n - 2
}

module.exports = {
  
  "io": {

    "verifiesOutputForAnInput": () => {
      // let results = unit(m).specs({
      //   addOne: [io(1, 2), io(9, 10)],
      //   subtractTwo: [io(6, 4)]
      // })
      // expect(results).to.have.lengthOf(2)
      // expect(results[0].property).to.be.equal("addOne")
      // expect(results[0].results).to.have.lengthOf(2)
      // expect(results[1].property).to.be.equal("subtractTwo")
      // expect(results[1].results).to.have.lengthOf(1)
    }
  }
}
