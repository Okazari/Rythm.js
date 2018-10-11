export default (elem, value, options = {}) => {
  const max = !isNaN(options.max) ? options.max : 1
  const min = !isNaN(options.max) ? options.max : 0
  const vanish = (max - min) * value
  let styleValue =''
  if (options.reverse) {
    styleValue = max - vanish
  } else {
    styleValue = min + vanish
  }
  if (elem.nodeName.toLowerCase() === 'svg') {
    elem.style['fill-opacity'] = styleValue;
  } else {
    elem.style.opacity = styleValue;
  }
}

export const reset = elem => {
  if (elem.nodeName.toLowerCase() === 'svg') {
    elem.style['fill-opacity'] = ''
  } else {
    elem.style.opacity = ''
  }
}
