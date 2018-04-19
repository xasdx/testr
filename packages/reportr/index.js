let { consoleReporter } = require("./reporters/console.reporter")

let TYPE_IO = "io"

let isMatcher = obj => obj.matcherType !== undefined

let reporter = ({ results, reporter = consoleReporter }) => {
  results.forEach(testResult => {
    
    reporter.onFunctionality({ name: testResult.property })
    
    testResult.results.forEach(result => {
      
      let ioSuccessResult = {
        module: result.moduleType,
        input: result.meta.input,
        actual: result.meta.output.actual()
      }
      
      let ioFailureResult = {
        module: result.moduleType,
        input: result.meta.input,
        actual: result.meta.output.actual(),
        expected: isMatcher(result.meta.output.expected) ? result.meta.output.expected.toString() : result.meta.output.expected
      }
      
      switch (result.moduleType) {
        case TYPE_IO:
          return result.success ? reporter.onIoSuccess(ioSuccessResult) : reporter.onIoFailure(ioFailureResult)
        default:
          throw new Error(`[reporter] result type ${result.moduleType} is not supported`)
      }
    })
  })
}

module.exports = { reporter }
