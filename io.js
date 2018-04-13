let io = () => {
  return f => {
    /* do assertions */
    return {
      success: true,
      type: "io",
      meta: {
        input: true,
        output: true
      }
    }
  }
}

module.exports = { io }
