export default (elem, value, options = {}) => {
  const options =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}

  const max = !isNaN(options.max) ? options.max : 25
  const min = !isNaN(options.min) ? options.min : 20
  const rotate3d = (max - min) * value
  if (options.reverse) {
    rotate3d = max - rotate3d
  } else {
    rotate3d = rotate3d
  }
  elem.style.transform = 'matrix(1, ' + Math.sin(rotate3d) + ', 0, 1 , 0 ,0)'
}

export const reset = elem => {
  elem.style.transform = ''
}
