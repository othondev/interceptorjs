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
    assert(beforeFn.called)
  })

  it('Should be call one before interceptor method',()=>{
    const beforeFn = spy()
    interceptor(moduleTest,'rememberMyName',{beforeFn})
    const result = moduleTest.rememberMyName('Jon','Norris')

    assert(beforeFn.called)
    assert(result === 'Jon Norris', `${result} is not Jon Norris`)
  })

  it('Should be call many before interceptor method',()=>{
    const beforeFn1 = spy()
    const beforeFn2 = spy()
    const beforeFn3 = spy()
    const arrayBefore = [beforeFn1,beforeFn2,beforeFn3]

    interceptor(moduleTest,'rememberMyName',{beforeFn:arrayBefore})
    const result = moduleTest.rememberMyName('Jon','Norris')

    assert(beforeFn1.called)
    assert(beforeFn2.called)
    assert(beforeFn3.called)
    assert(result === 'Jon Norris', `${result} is not Jon Norris`)

  })
})
