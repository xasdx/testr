# @testr/io

> Testr submodule to create concise test cases to be executed by runnr

## Api

### io

Ideal for testing pure functions, expecting a value for a given input.

```javascript
io(5, 6) // gets called with 5, returns 6
io(3, 4, 12) // gets called with 3 and 4, outputs 12
io(9, type.number) // last parameter might be the expected value or a matcher (like type.number)
io({ io: [6, 0], out: 0 }) // input and output values might be specified more explicitly by passing an object
io(5, x => x > 0) // lambdas function as custom matchers
io(5, [type.number, x => x % 2 === 0]) // multiple matchers can be supplied in an array
```

### matchers

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
  findUsers: io({}, called(mockRepository.find, { times: 1, inputs: [{}] })
}
```
