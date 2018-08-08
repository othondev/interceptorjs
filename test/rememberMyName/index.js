exports.rememberMyName = (...names)=>{
  return names.reduce((accumulator, currentValue)=>`${accumulator} ${currentValue}`)
}
exports.sumAge = (...age) => age.reduce((a,i)=>a+i)
