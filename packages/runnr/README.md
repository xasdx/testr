# @testr/runnr

## Api

### unit

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
