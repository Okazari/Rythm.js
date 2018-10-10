export default (elem, value, options = {}) => {
    let max = !isNaN(options.max) ? options.max : 90
    let min = !isNaN(options.min) ? options.min : -90
    if (options.direction === 'left') {
      max = -max
      min = -min
    }
    const twirl = (max - min) * value
    elem.style.transform = `rotate3d(0, 1, 1, ${min + twirl}deg)`
  }
  
  export const reset = elem => {
    elem.style.transform = ''
  }
  
