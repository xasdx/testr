# testr

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
    io(mockRepository, {}, is(result => console.log(result.length)))
  ]
})
```
