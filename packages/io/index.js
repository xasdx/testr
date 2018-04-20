let { is } = require("../common")

let matchers = require("./matchers")

let MODULE_TYPE = "io"

let evaluateMatcher = (matcher, functionality) => matcher.matcherType ? matcher.matches(functionality)
                                                                      : matcher === functionality()
                                                                      
let parseArguments = argz => {
  let args = [...argz]
  let matcher = args.splice(-1)[0]
  return { args, matcher }
}

let createIoResult = (args, matcher) => ({
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
    return ioResult
  }
})

let io = function () {
  let { args, matcher } = parseArguments(arguments)

  if (is.array(matcher)) {
    return matcher.map(m => createIoResult(args, m))
  }

  return createIoResult(args, matcher)
}

module.exports = { io, matchers }
