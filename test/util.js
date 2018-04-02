class InvocationCouter {

  constructor() {
    this.invocations = 0
  }

  onFunction() {
    return () => this.invocations += 1
  }
}

module.exports = { InvocationCouter }
