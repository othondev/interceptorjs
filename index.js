const isArrayObject = obj => Object.prototype.toString.call(obj) === '[object Array]'

const compileRegex = methodsRegex =>{
  const regex = methodsRegex.reduce((accumulator, currentValue) => `${accumulator}|${currentValue}`)
  return new RegExp(`^(${regex})$`)
}

const makeArray = fn => isArrayObject(fn) ? fn : [fn]

exports.interceptor = (instance,methodsRegex,{beforeFn=[],afterFn=[]}=functions)=>{

  beforeFn = makeArray(beforeFn)
  afterFn = makeArray(afterFn)
  methodsRegex = makeArray(methodsRegex)

  const regex = compileRegex(methodsRegex)

  const matchMethod = Object.keys(instance)
  .filter(i => regex.test(i))
  .filter(i => !!i)

    matchMethod.forEach(async method =>{
      const originalMethodPromise = instance[method]
      instance[method] = (...args)=>{
        beforeFn.forEach(fn=>fn.apply(instance))
        const resultOriginalFunc = originalMethodPromise.apply(instance,args)
        afterFn.forEach(fn=>fn.call(instance))
        return resultOriginalFunc
      }
    })
}
