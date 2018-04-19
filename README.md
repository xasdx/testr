# testr

[![Build Status](https://travis-ci.org/xasdx/testr.svg?branch=master)](https://travis-ci.org/xasdx/testr)

> A test framework with zero dependencies

## Packages

[@testr/runnr](https://github.com/xasdx/testr/tree/master/packages/doublr/README.md) - Runs unit tests.
[@testr/io](https://github.com/xasdx/testr/tree/master/packages/io/README.md) - Creates concise test cases to be executed by runnr.
[@testr/reportr](https://github.com/xasdx/testr/tree/master/packages/reportr/README.md) - Reports test results using custom reporters. Default console reporter implementation included.
[@testr/doublr](https://github.com/xasdx/testr/tree/master/packages/doublr/README.md) - Substitutes dependencies with test doubles, like spies and mocks.

## Example

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
