exports.rememberMyName = (...names)=>{
  return names.reduce((accumulator, currentValue)=>`${accumulator} ${currentValue}`)
}
exports.sumAge = (...age) => age.reduce((a,i)=>a+i)
exports.methodA = () => 'A'
exports.methodB = () => 'B'
exports.methodC = () => 'C'
exports.varA = 'varA'
exports.varB = 'varB'
