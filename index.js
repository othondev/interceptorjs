const {promisify} = require('util')

exports.interceptor = async (instance,methodName,{beforeFn=[],afterFn=[]}=functions)=>{
  const isArrayObject = obj => Object.prototype.toString.call(obj) === '[object Array]'
  const makeArray = fn => isArrayObject(fn) ? fn : [fn]

  const originalMethodPromise = promisify(instance[methodName])
  beforeFn = makeArray(beforeFn)
  afterFn = makeArray(afterFn)

  beforeFn.forEach(fn=>fn.apply(instance))
  const resultOriginalFunc = await originalMethodPromise()
  afterFn.forEach(fn=>fn.call(instance))

  return resultOriginalFunc
}
