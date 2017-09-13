export default (elem, value, options = {}) => {
    const max = !isNaN(options.max) ? options.max : 25
    const min = !isNaN(options.min) ? options.min : 0
    let borderRadius = (max - min) * value
    if(options.reverse) {
      borderRadius = max - borderRadius
    } else {
      borderRadius = min + borderRadius
    }
    elem.style.borderRadius = `${borderRadius}px`
  }
