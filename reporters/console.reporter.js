let { is } = require("../util")

let TYPE_IO = "io"

let isMatcher = obj => obj.matcherType !== undefined

let COLOR = {
  YELLOW: "\x1b[33m%s\x1b[0m",
  GREEN: "\x1b[32m%s\x1b[0m",
  RED: "\x1b[31m%s\x1b[0m"
}

let colorize = function () {
  return [...arguments].map(token => is.array(token) ? token[0].replace("%s", token[1]) : token).join(" ")
}

let logColored = function () { console.log(colorize(...arguments)) }

let logSuccess = result => logColored(
  [COLOR.GREEN, " +"],
  result.moduleType,
  "#",
  "input",
  [COLOR.GREEN, JSON.stringify(result.meta.input)],
  "outputs",
  [COLOR.GREEN, JSON.stringify(result.meta.output.actual())]
)

let logFailure = result => {
  let expected = isMatcher(result.meta.output.expected) ? result.meta.output.expected.toString() : result.meta.output.expected
  logColored(
    [COLOR.RED, " -"],
    result.moduleType,
    "#",
    "input",
    [COLOR.RED, JSON.stringify(result.meta.input)],
    "should output",
    `${expected},`,
    "but got",
    [COLOR.RED, JSON.stringify(result.meta.output.actual())]
  )
}

let reporter = testResults => {
  testResults.forEach(testResult => {
    logColored([COLOR.YELLOW, "--"], testResult.property)
    testResult.results.forEach(result => {
      switch (result.moduleType) {
        case TYPE_IO:
          return result.success ? logSuccess(result) : logFailure(result)
        default:
          throw new Error(`[reporter] result type ${result.moduleType} is not supported`)
      }
    })
  })
}

module.exports = { reporter }
