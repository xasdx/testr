# @testr/reportr

> Testr submodule to report test results using custom reporters

## Api

### default reporter

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
report({ results })
```

### custom reporters

Testr can be extended with custom reporters by implementing the following interface:

```javascript
let customReporter = {
  onFunctionality: ({ name }) => {},
  onIoSuccess: ({ module, input, actual }) => {},
  onIoFailure: ({ module, input, actual, expected }) => {}
}

let results = unit(myModule).specs(mySpecs)

// omitting the reporter property causes the framework to fall back to the default console reporter
report({ results, reporter: customReporter })
```
