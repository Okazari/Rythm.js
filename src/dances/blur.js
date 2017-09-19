export default (elem, value, options = {}) => {
  const max = !isNaN(options.max) ? options.max : 8
  const min = !isNaN(options.min) ? options.min : 0
  let blur = (max - min) * value
  if(options.reverse) {
    blur = max - blur
  } else {
    blur = min + blur
  }
  elem.style.filter = `blur(${blur}px)`
}

export const reset = elem => {
  elem.style.filter = ''
}
