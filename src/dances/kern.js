export default (elem, value, options = {}) => {
  const max = !isNaN(options.max) ? options.max : 25
  const min = !isNaN(options.min) ? options.min : 0
  let kern = (max - min) * value
  if (options.reverse) {
    kern = max - kern
  } else {
    kern = min + kern
  }
  elem.style.letterSpacing = `${kern}px`
}

export const reset = elem => {
  elem.style.letterSpacing = ''
}
