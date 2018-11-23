export default (elem, value, options = {}) => {
  const max = !isNaN(options.max) ? options.max : 900
  const min = !isNaN(options.min) ? options.min : 100
  const fontWeight = (max - min) * value + min
  elem.style.fontWeight = `${fontWeight};`
}

export const reset = elem => {
  elem.style.fontWeight = '400'
}
