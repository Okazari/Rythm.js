export default (elem, value, options = {}) => {
    const max = !isNaN(options.max) ? options.max : 25
    const min = !isNaN(options.min) ? options.min : 0
    const borderRadius = (max - min) * value
    elem.style.borderRadius = `${borderRadius}px`
  }
