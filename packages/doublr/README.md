# @testr/doublr

> Testr subpackage that substitutes dependencies with test doubles, like spies and mocks

## Api

### .spy

A spy wraps functionalities and maintains metadata about their behavior,

for example the number of times a method was called and the arguments it was called with.

```javascript
let { spy } = require("@testr/doublr")

let aSpy = spy({ addOne: n => n + 1 })
aSpy.addOne(3)
aSpy.addOne.numberOfInvocations // is 1
aSpy.addOne.invocations[0] // { in: [3] }
```
