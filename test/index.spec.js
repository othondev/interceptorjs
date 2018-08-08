const {assert} = require('chai')
const axios = require('axios')
const {spy} = require('sinon')
const {interceptor} = require('../')

describe('Test call method',()=>{
  it('Should be call one before interceptor method',()=>{
    const beforeFn = spy()
    const axiosInstace = interceptor(axios,'get',{beforeFn})
    axios.get('/')

    assert(beforeFn.called)
  })
  it('Should be call many before interceptor method',()=>{
    const beforeFn1 = spy()
    const beforeFn2 = spy()
    const beforeFn3 = spy()
    const arrayBefore = [beforeFn1,beforeFn2,beforeFn3]

    const axiosInstace = interceptor(axios,'get',{beforeFn:arrayBefore})
    axios.get('/')

    assert(beforeFn1.called)
    assert(beforeFn2.called)
    assert(beforeFn3.called)

  })
})
