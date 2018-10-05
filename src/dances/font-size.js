export default (elem, value, options = {}) => {
  const max = !isNaN(options.max) ? options.max : 0.8
  const min = !isNaN(options.min) ? options.min : 1.2
  const fontSize = (max - min) * value + min
  elem.style.fontSize = `${fontSize}em`
}

export const reset = elem => {
  elem.style.fontSize = '1em'
}
