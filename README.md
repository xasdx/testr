# testr

[![Build Status](https://travis-ci.org/xasdx/testr.svg?branch=master)](https://travis-ci.org/xasdx/testr)

> A test framework with zero dependencies

## Introduction

Let us assume you are working on the following module:

```javascript
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
module.exports = { addOne, multiply, findUsers }
```

And since you care about your code, you are contemplating if you should add test coverage or not.

You have time constraints, so you need this fast and you hate boilerplate anyways.

Testr lets you write specs like below:

```javascript
let { unit, io, throws, random, type, like, called } = require("testr")

unit({ addOne, multiply, findUsers }).specs({
  addOne: [
    io(5, 6),
    io(9, type.number),
    io(true, throws),
    io(random.number, type.number),
    io({ in: [6], out: 7 })
  ],
  multiply: io(3, 4, 12),
  findUsers: [
    io(mockRepository, { country: "Hungary" }, like([{ name: type.string }])),
    io(mockRepository, {}, [
      called(mockRepository.find, {}),
      result => console.log(result.length)
    ])
  ]
})
```

## Api

### Runners:

#### unit

Wraps a module as the 'under test' subject.

```javascript
unit({ calculate: n => n + 1 }).specs({
  calculate: [] // specifies particular test cases for the calculate functionality
})

// can load external modules directly by calling unit with a path
unit("../services/user.service").specs({ findUsers: [] })

// it also supports the mocking of `require` statements in node.js
// by passing a config object with the desired mocks to unit
unit(
  "../services/user.service",
  { mocked: { "../repositories/userRepository": mockUserRepository } }
).specs({ findUsers: [] })
```

### Modules:

#### io

Ideal for testing pure functions, expecting a value for a given input.

```javascript
io(5, 6) // gets called with 5, returns 6
io(3, 4, 12) // gets called with 3 and 4, outputs 12
io(9, type.number) // last parameter might be the expected value or a matcher (like type.number)
io({ io: [6, 0], out: 0 }) // input and output values might be specified more explicitly by passing an object
io(5, x => x > 0) // lambdas function as custom matchers
io(5, [type.number, x => x % 2 === 0]) // multiple matchers can be supplied in an array
```

### Matchers:

Matchers can be used in combination with the io module, their purpose is to help express assertions on test results.

#### type

Asserts that a return value has a specific type.

```javascript
io(1, type.number) // asserts a number return value
io(1, type.boolean) // asserts a boolean return value
```

#### throws

Asserts that a functionality throws an Error.

```javascript
io(null, throws) // asserts that the functionality throws an Error
io(null, throwsLike(/bad happened/i)) // asserts that an Error with message containing 'bad happened' was thrown
```

#### like

Asserts that the result object (or array) is like it is expected.

```javascript
// asserts the result object to contain the specified properties with exact values
io({ name: "paul" }, like({ name: "paul", age: 23 }))
```

#### exactly

Asserts that the result object (or array) is exactly like it is expected.

```javascript
// asserts the result object to contain only the specified properties with exact values
io({ name: "paul" }, exactly({ name: "paul", age: 23 }))
// the result array contains the exact values
io({ name: "paul" }, exactly([{ name: "paul", age: 5 }, { name: "paul", age: 6 }]))
```

#### structured

Asserts that the result object (or array) is structured like it is expected.

```javascript
// asserts that the result is an object with exactly two properties
io({ name: "paul" }, structured({ name: type.string, age: type.number }))
// the result is an array containing objects with the specified schema
io({ name: "paul" }, structured([{ name: type.string, age: type.number }]))
```

#### called

Verifies interactions performed on mocks and spies.

```javascript
{
  // 'find' method was called on mockRepository with '{}' once
  findUsers: io({}, called(mockRepository.find, {}, { times: 1 })
}
```

### Test doubles:

#### spy

A spy wraps functionalities and maintains metadata about their behavior,

for example the number of times a method was called and the arguments it was called with.

```javascript
let aSpy = spy({ addOne: n => n + 1 })
aSpy.addOne(3)
aSpy.addOne.numberOfInvocations // is 1
aSpy.addOne.invocations[0] // { in: [3] }
```

### Reporting:

#### default reporter

Testr has a built-in, default reporter logging to the console, indicating the success of the test cases.

```
-- addOne
 + io # input [1] outputs 2
 - io # input [1] should output a boolean value, but got 2
 - io # input [0] should output an Error, but got 1
-- findUser
 + io # input [{}] outputs {"name":"paul"}
 - io # input [{}] should output an object like {"name":"paul","age":13}, but got {"name":"paul"}
```

```javascript
let { unit, report } = require("testr")

let results = unit(myModule).specs(mySpecs)
report(results)
```
