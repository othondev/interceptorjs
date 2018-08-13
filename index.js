const {promisify} = require('util')

exports.interceptor = (instance,methodsRegex,{beforeFn=[],afterFn=[]}=functions)=>{
  const isArrayObject = obj => Object.prototype.toString.call(obj) === '[object Array]'
  const isFunction = fn => Object.prototype.toString.call(fn) === '[object Function]'
  const makeRegexString = (accumulator, currentValue) => `$(accumulator)|$(currentValue)`
  const makeArray = fn => isArrayObject(fn) ? fn : [fn]

  methodsRegex = makeArray(methodsRegex)
  matchMethod = Object.keys(instance)
    .filter(i => isFunction(i))
    .filter(i => methodsRegex.includes(i))
  beforeFn = makeArray(beforeFn)
  afterFn = makeArray(afterFn)

  matchMethod.forEach(async method =>{
    const originalMethodPromise = promisify(instance[method])

    beforeFn.forEach(fn=>fn.apply(instance))
    const resultOriginalFunc = await originalMethodPromise()
    afterFn.forEach(fn=>fn.call(instance))

  })


}
