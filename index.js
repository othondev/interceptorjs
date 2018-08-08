exports.interceptor = (instance,methodName,{beforeFn=[],afterFn=[]}=functions)=>{
  const isArrayObject = obj => Object.prototype.toString.call(obj) === '[object Array]'
  const makeArray = fn => isArrayObject(fn) ? fn : [fn]

  const oldMethod = instance[methodName]
  beforeFn = makeArray(beforeFn)
  afterFn = makeArray(afterFn)

  instance[methodName] = ()=>{
    beforeFn.forEach( fn=>fn.apply(instance) )
    oldMethod.apply(instance, arguments)
    afterFn.forEach(fn=>fn.apply(instance))
  }

  return instance
}
