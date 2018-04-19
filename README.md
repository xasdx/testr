
# testr

[![Build Status](https://travis-ci.org/xasdx/testr.svg?branch=master)](https://travis-ci.org/xasdx/testr)

> A test framework with zero dependencies

## Packages

This monorepo contains all subpackages related to the __Testr__ framework.

| Version | Package | Description |
|--------|-------|------------|
| Not released |[`@testr/runnr`](https://github.com/xasdx/testr/tree/master/packages/doublr) | Runs simple unit tests |
| Not released | [`@testr/io`](https://github.com/xasdx/testr/tree/master/packages/io) | Creates concise test cases to be executed by `@testr/runnr` |
| Not released | [`@testr/reportr`](https://github.com/xasdx/testr/tree/master/packages/reportr) | Reports test results |
| Not released | [`@testr/doublr`](https://github.com/xasdx/testr/tree/master/packages/doublr) | Substitutes dependencies with test doubles |

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

And since you care about your code, you are contemplating to add some test coverage.  You have time constraints, so you need this fast and you hate boilerplate anyways.

With testr you can write concise specs like:

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
