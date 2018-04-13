# testr

[![BCH compliance](https://bettercodehub.com/edge/badge/xasdx/testr?branch=master)](https://bettercodehub.com/)

> A test framework with zero dependencies

```javascript
let { unit, io, throws, random, type } = require("testr")

let addOne = n => n + 1
let multiply = (n, m) => n * m

unit({ addOne }).specs({
  addOne: [
    io(5, 6),
    io(9, type.number),
    io(true, throws),
    io(random.number, type.number)
  ],
  multiply: [
    io(3, 4, 12),
    io(6, 0, 0)
  ]
})
```
