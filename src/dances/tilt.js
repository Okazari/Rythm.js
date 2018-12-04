export default (elem, value, options = {}) => {
  const max = !isNaN(options.max) ? options.max : 25
  const min = !isNaN(options.min) ? options.min : 20
  let rotate3d = (max - min) * value
  if (options.reverse) {
    rotate3d = max - rotate3d
  }
  elem.style.transform = 'matrix(1, ' + Math.sin(rotate3d) + ', 0, 1 , 0 ,0)'
}

export const reset = elem => {
  elem.style.transform = ''
}
