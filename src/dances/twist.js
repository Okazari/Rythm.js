export default (elem, value, options = {}) => {
  let max = !isNaN(options.max) ? options.max : 20
  let min = !isNaN(options.min) ? options.min : -20
  if (options.direction === 'left') {
    max = -max
    min = -min
  }
  const twist = (max - min) * value
  elem.style.transform = `rotate(${min + twist}deg) translateZ(0)`
}

export const reset = elem => {
  elem.style.transform = ''
}
