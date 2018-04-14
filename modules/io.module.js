let { log } = require("../util")

let MODULE_TYPE = "io"

let MATCHER_TYPE = {
  TYPE: "type"
}

let evaluateMatcher = (matcher, value) => {
  switch (matcher.matcherType) {
    case MATCHER_TYPE.TYPE:
      return matcher.matches(value)
    default: // it is a primitive
      return matcher === value
  }
}

let parseArguments = arguments => {
  let args = [...arguments]
  let matcher = args.splice(-1)[0]
  return { args, matcher }
}

let io = function () {
  let { args, matcher } = parseArguments(arguments)

  return {
    moduleType: MODULE_TYPE,
    execute: f => {
      let result = f(...args)
      let ioResult = {
        success: evaluateMatcher(matcher, result),
        moduleType: MODULE_TYPE,
        meta: {
          input: args,
          output: {
            expected: matcher,
            actual: result
          }
        }
      }
      if (process.env.TESTR_IO_DEBUG) { log(ioResult) }
      return ioResult
    }
  }
}

module.exports = { io }
