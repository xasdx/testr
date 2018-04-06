module.exports = (expected, actual, matcher, failureDescription, modifiers) => {
  return {
    match: matcher(expected, actual),
    fail: failureDescription,
    actual,
    expected,
    modifiers: modifiers || []
  }
}
