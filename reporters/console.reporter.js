let TYPE_IO = "io"

let isMatcher = obj => obj.matcherType !== undefined

let reporter = testResults => {
  testResults.forEach(testResult => {
    console.log(`-- ${testResult.property}`)
    testResult.results.forEach(result => {
      switch (result.moduleType) {
        case TYPE_IO:
          if (result.success) {
            console.log(` + ${result.moduleType} # input ${result.meta.input} outputs ${result.meta.output.actual}`)
          } else {
            let expected = isMatcher(result.meta.output.expected) ? result.meta.output.expected.toString() : result.meta.output.expected
            console.log(` - ${result.moduleType} # input ${result.meta.input} should output ${expected} (got ${result.meta.output.actual})`)
          }
          break
        default:
          throw new Error(`[reporter] result type ${result.moduleType} is not supported`)
      }
    })
  })
}

module.exports = { reporter }
