const generateTextShadow = (value, min, max, neons) => neons.reduce((textShadow,{ strength, color }) => {
    const computedValue = strength + ((max - min) * value + min)
    return `${textShadow ? `${textShadow},` : ''} 0 0 ${computedValue}px ${color}`
}, null)

export default (elem, value, options = {}) => {
    const max = !isNaN(options.max) ? options.max : 0
    const min = !isNaN(options.min) ? options.min : 10
    elem.style.textShadow = generateTextShadow(value, min, max, options.neons)
}
  
export const reset = elem => {
    elem.style.textShadow = null
}
  