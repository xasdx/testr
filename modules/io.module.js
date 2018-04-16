let { log } = require("../util")

let MODULE_TYPE = "io"

let evaluateMatcher = (matcher, functionality) => matcher.matcherType ? matcher.matches(functionality)
                                                                      : matcher === functionality()
                                                                      
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
      let functionality = () => f(...args)
      let ioResult = {
        success: evaluateMatcher(matcher, functionality),
        moduleType: MODULE_TYPE,
        meta: {
          input: args,
          output: {
            expected: matcher,
            actual: functionality
          }
        }
      }
      if (process.env.TESTR_IO_DEBUG) { log(ioResult) }
      return ioResult
    }
  }
}

module.exports = { io }
