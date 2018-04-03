class InvocationCouter {

  constructor() {
    this.invocations = 0
  }

  onFunction() {
    return () => this.invocations += 1
  }
}

class CustomTestReporter {
  reporterFunction() {
    return results => this.report = results
  }
}

module.exports = {
  InvocationCouter,
  CustomTestReporter
}
