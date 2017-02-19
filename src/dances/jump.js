export default {
  apply: (elem, value, options = {}) => {
    const max = options.max || 30
    const min = options.min || 0
    const jump = (max - min) * value
    elem.style.transform = `translateY(${-jump}px)`
  }
}