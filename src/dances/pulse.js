export default (elem, value, options = {}) => {
  const max = !isNaN(options.max) ? options.max : 1.25
  const min = !isNaN(options.min) ? options.min : 0.75
  const scale = (max - min) * value
  elem.style.transform = `scale(${min + scale}) translateZ(0)`
}

export const reset = elem => {
  elem.style.transform = ''
}
