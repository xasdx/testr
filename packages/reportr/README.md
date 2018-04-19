
# @testr/reportr

> Testr subpackage that reports test results using custom reporters

## Api

### default reporter

__Reportr__ comes with a default reporter logging to the console, indicating the success of the test cases.

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
let { unit } = require("@testr/runnr")
let { reporter } = require("@testr/reportr")

let results = unit(myModule).specs(mySpecs)
reporter({ results })
```

### custom reporters

__Reportr__ can be extended with custom reporters by implementing the following interface:

```javascript
let customReporter = {
  onFunctionality: ({ name }) => {},
  onIoSuccess: ({ module, input, actual }) => {},
  onIoFailure: ({ module, input, actual, expected }) => {}
}

let results = unit(myModule).specs(mySpecs)

// omitting the reporter property causes the framework to fall back to the default console reporter
reporter({ results, reporter: customReporter })
```
