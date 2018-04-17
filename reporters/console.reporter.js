let { is } = require("../util")

let COLOR = {
  YELLOW: "\x1b[33m%s\x1b[0m",
  GREEN: "\x1b[32m%s\x1b[0m",
  RED: "\x1b[31m%s\x1b[0m"
}

let colorize = function () {
  return [...arguments].map(token => is.array(token) ? token[0].replace("%s", token[1]) : token).join("")
}

let logColored = function () { console.log(colorize(...arguments)) }

let onFunctionality = ({ name }) => logColored("\n", [COLOR.YELLOW, "-- "], name, "\n")

let onIoSuccess = ({ module, input, actual }) => logColored(
  [COLOR.GREEN, " + "],
  module,
  " # ",
  "input ",
  [COLOR.GREEN, JSON.stringify(input)],
  " outputs ",
  [COLOR.GREEN, JSON.stringify(actual)]
)

let onIoFailure = ({ module, input, actual, expected }) => logColored(
  [COLOR.RED, " - "],
  module,
  " # ",
  "input ",
  [COLOR.RED, JSON.stringify(input)],
  " should output ",
  `${expected},`,
  " but got ",
  [COLOR.RED, JSON.stringify(actual)]
)

module.exports = { consoleReporter: { onFunctionality, onIoSuccess, onIoFailure } }
