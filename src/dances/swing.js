const coefficientMap = {
  up: -1,
  down: 1,
  left: 1,
  right: -1,
}

export default (elem, value, options = {}) => {
  const radius = !isNaN(options.radius) ? options.radius : 20
  const direction = Object.keys(coefficientMap).includes(options.direction) ? options.direction : 'right';
  const curve = Object.keys(coefficientMap).includes(options.curve) ? options.curve : 'down'
  const [xCoefficient, yCoefficient] = [coefficientMap[direction], coefficientMap[curve]]
  elem.style.transform = `translate3d(${xCoefficient * radius * Math.cos(value * Math.PI)}px, ${yCoefficient * radius * Math.sin(value * Math.PI)}px, 0)`
}

export const reset = elem => {
  elem.style.transform = ''
}
