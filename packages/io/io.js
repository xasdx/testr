let { is } = require("../common")

let MODULE_TYPE = "io"

let isMatcher = obj => obj.matcherType !== undefined

let isCustomMatcher = obj => is.function(obj)

let hasMultipleMatchers = obj => is.array(obj)

let evaluateMatcher = (matcher, functionality) => {
  if (isMatcher(matcher)) {
    return matcher.matches(functionality)
  } else if (isCustomMatcher(matcher)) {
    return matcher(functionality())
  } else {
    // matcher is a primitve
    return matcher === functionality()
  }
}

let parseArguments = argz => {
  let args = [...argz]
  let matcher = args.splice(-1)[0]
  return { args, matcher }
}

let createIoResult = (args, matcher, functionality) => ({
  success: evaluateMatcher(matcher, functionality),
  moduleType: MODULE_TYPE,
  meta: {
    input: args,
    output: {
      expected: matcher,
      actual: functionality
    }
  }
})

let createIoTask = (args, matcher) => ({
  moduleType: MODULE_TYPE,
  execute: f => createIoResult(args, matcher, () => f(...args))
})

let io = function () {
  let { args, matcher } = parseArguments(arguments)

  if (hasMultipleMatchers(matcher)) {
    return matcher.map(m => createIoTask(args, m))
  }

  return createIoTask(args, matcher)
}

module.exports = { io }
