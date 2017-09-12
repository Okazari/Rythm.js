export default (elem, value, options = {}) => {
  const max = !isNaN(options.max) ? options.max : 1
  const min = !isNaN(options.max) ? options.max : 0
  const vanish = (max - min) * value
  if(options.reverse) {
    elem.style.opacity = max - vanish
  } else {
    elem.style.opacity = min + vanish
  }
}

export const reset = elem => {
  elem.style.opacity = ''
}
