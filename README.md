# interceptorjs
The simple module to interceptor method
## Installing
## API
```js
interceptor(
  instance,
  methodName,
  options:{
    beforeFn:<Object or Array>,
    afterFn:<Object or Array>,
  }
)
```
## Example

Using single before trigger method
```js
const moduleInstace = require('moduleInstace')
const beforeFn ()=> console.log('before')

interceptor(moduleInstace,'methodName',{beforeFn})
```
Using array before trigger method
```js
const moduleInstace = require('moduleInstace')
const beforeFn = [
  ()=> console.log('before1'),
  ()=> console.log('before2'),
  ()=> console.log('before3'),
]

interceptor(moduleInstace,'methodName',{beforeFn})
```

## License
MIT
