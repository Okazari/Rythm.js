export default (elem, value, options = {}) => {
  const max = !isNaN(options.max) ? options.max : 5
  const min = !isNaN(options.min) ? options.min : 0
  const borderWidth = (max - min) * value + min
  elem.style.borderWidth = `${borderWidth}px`
}

export const reset = elem => {
  elem.style.borderWidth = ''
}
