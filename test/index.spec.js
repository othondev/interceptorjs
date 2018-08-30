const {assert} = require('chai')
const {spy} = require('sinon')
const {interceptor} = require('../')
const moduleTest = require('./rememberMyName')

describe('Test call method',()=>{
  it('Should be call origin module',()=>{
    const result = moduleTest.rememberMyName('Jon','Norris')
    assert(result === 'Jon Norris', `${result} is not Jon Norris`)
  })

  it('Should be keep origin method sumAge',()=>{
    const beforeFn = spy()
    interceptor(moduleTest,'rememberMyName',{beforeFn})
    moduleTest.rememberMyName('Jon','Norris')

    const sumAge = moduleTest.sumAge(20,25)
    assert(sumAge === 45, `sumAge is not ${sumAge}`)
    assert(beforeFn.called,'beforeFn is not called')
  })

  it('Should be call one before interceptor method',()=>{
    const beforeFn = spy()
    interceptor(moduleTest,'rememberMyName',{beforeFn})
    const result = moduleTest.rememberMyName('Jon','Norris')

    assert(beforeFn.called,'beforeFn is not called')
    assert(result === 'Jon Norris', `${result} is not Jon Norris`)
  })

  it('Should be call many before interceptor method',()=>{
    const beforeFn1 = spy()
    const beforeFn2 = spy()
    const beforeFn3 = spy()
    const arrayBefore = [beforeFn1,beforeFn2,beforeFn3]

    interceptor(moduleTest,'rememberMyName',{beforeFn:arrayBefore})
    const result = moduleTest.rememberMyName('Jon','Norris')

    assert(beforeFn1.called,'beforeFn1 is not called')
    assert(beforeFn2.called,'beforeFn2 is not called')
    assert(beforeFn3.called,'beforeFn3 is not called')
    assert(result === 'Jon Norris', `${result} is not Jon Norris`)

  })

  it('Should be call before trigger on all methods',()=>{
    const beforeFn1 = spy()

    interceptor(moduleTest,'.*',{beforeFn:beforeFn1})
    const result = moduleTest.rememberMyName('Jon','Norris')
    const resultSum = moduleTest.sumAge(1,2,3)

    assert(beforeFn1.calledTwice)

  })

  it('Should trigger only methodA and methodB',()=>{
    const beforeFn1 = spy()
    interceptor(moduleTest,'methodA|methodB',{beforeFn:beforeFn1})
    moduleTest.methodA()
    moduleTest.methodB()
    assert(beforeFn1.calledTwice)
  })

})
