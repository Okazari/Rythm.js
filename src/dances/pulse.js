export default {
  apply: (elem, value, options = {}) => {
    const max = options.max || 1.25
    const min = options.min || 0.75
    const scale = (max - min) * value
    elem.style.transform = `scale(${min + scale})`
  }
}