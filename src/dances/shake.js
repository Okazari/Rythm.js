export default (elem, value, options = {}) => {
  let max = !isNaN(options.max) ? options.max : 15
  let min = !isNaN(options.min) ? options.min : -15
  if (options.direction === 'left') {
    max = -max
    min = -min
  }
  const twist = (max - min) * value
  elem.style.transform = `translate3d(${min + twist}px, 0, 0)`
}

export const reset = elem => {
  elem.style.transform = ''
}
