export default (elem, value, options = {}) => {
  const from = options.from || [0, 0, 0]
  const to = options.to || [255, 255, 255]
  const scaleR = (to[0] - from[0]) * value
  const scaleG = (to[1] - from[1]) * value
  const scaleB = (to[2] - from[2]) * value
  elem.style.borderColor = `rgb(${Math.floor(to[0] - scaleR)}, ${Math.floor(
    to[1] - scaleG
  )}, ${Math.floor(to[2] - scaleB)})`
}

export const reset = elem => {
  elem.style.borderColor = ''
}
