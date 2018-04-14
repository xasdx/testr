let TYPE = "io"

let io = function () {
  let args = [...arguments]
  let outputValue = args.splice(-1)[0]

  return {
    type: TYPE,
    execute: f => {
      let result = f(...args)
      return {
        success: result === outputValue,
        type: TYPE,
        meta: {
          input: args,
          output: {
            expected: outputValue,
            actual: result
          }
        }
      }
    }
  }
}

module.exports = { io }
