export default {
  apply: (elem, value, options = {}) => {
    const max = options.max || 15
    const min = options.min || -15
    const direction = options.direction || 'left'
    let shake = 0
    if (value < 0.5) {
      shake = (0.5 - value) * min
    } else {
      shake = (value - 0.5) * max
    }
    elem.style.transform = `translateX(${direction === 'right' ? shake : -shake}px)`
  }
}