let TYPE = "throws"

let matcher = f => {
  try {
    f()
    return false
  } catch (err) {
    return true
  }
}

let messageMatcher = msg => f => {
  try {
    f()
    return false
  } catch (err) {
    return msg.test(err.message) ? true : false
  }
}

let throws = {
  matcherType: TYPE,
  matches: matcher,
  toString: () => "an Error"
}

let throwsLike = messageRegex => Object.assign({}, throws, { matches: messageMatcher(messageRegex) })

module.exports = { throws, throwsLike }
