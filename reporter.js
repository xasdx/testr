let TYPE_IO = "io"

let reporter = testResults => {
  testResults.forEach(testResult => {
    console.log(`-- ${testResult.property}`)
    testResult.results.forEach(result => {
      switch (result.type) {
        case TYPE_IO:
          if (result.success) {
            console.log(` + ${result.type} # input ${result.meta.input} outputs ${result.meta.output.actual}`)
          } else {
            console.log(` - ${result.type} # input ${result.meta.input} should output ${result.meta.output.expected} (got ${result.meta.output.actual})`)
          }
          break
        default:
          throw new Error(`[reporter] result type ${result.type} is not supported`)
      }
    })
  })
}

module.exports = { reporter }
