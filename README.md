# testr

[![Build Status](https://travis-ci.org/xasdx/testr.svg?branch=master)](https://travis-ci.org/xasdx/testr)

> A test framework with zero dependencies

```javascript
let { unit, io, throws, random, type, like, is } = require("testr")

let addOne = n => n + 1
let multiply = (n, m) => n * m
let findUsers = (repository, query) => {
  let users = repository.find(query)
  return users.map(user => {
    return {
      name: `${user.firstName} ${user.lastName}`
    }
  })
}

unit({ addOne, multiply, findUsers }).specs({
  addOne: [
    io(5, 6),
    io(9, type.number),
    io(true, throws),
    io(random.number, type.number)
  ],
  multiply: [
    io(3, 4, 12),
    io({ in: [6, 0], out: 0 })
  ],
  findUsers: [
    io(mockRepository, { country: "Hungary" }, like([{ name: type.string }])),
    io(mockRepository, {}, [
      called(mockRepository.find, {}),
      outputs(result => console.log(result.length))
    ])
  ]
})
```

It has a built-in reporter, which logs to the console, displaying some information and indicating the success of the test cases:

```
-- addOne
 + io # input [1] outputs 2
 - io # input [1] should output a boolean value, but got 2
 - io # input [0] should output an Error, but got 1
```

Matchers:

type

```javascript
io(1, type.number)
io(1, type.boolean)
```

throws

```javascript
io(null, throws)
io(null, throwsLike(/bad happened/i))
```
