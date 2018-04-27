module.exports = class {

  constructor(service) {
    this.service = service
  }

  addOne(n) {
    return n + 1
  }

  subtractTwo(n) {
    return n - 2
  }

  findUser(query) {
    return this.service.find(query)
  }
}
