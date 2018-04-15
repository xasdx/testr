let TYPE = "throws"

let matcher = f => {
  try {
    f()
    return false
  } catch (err) {
    return true
  }
}

let throws = {
  matcherType: TYPE,
  matches: matcher,
  toString: () => "an Error"
}

module.exports = { throws }
