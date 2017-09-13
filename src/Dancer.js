import pulse from './dances/pulse.js'
import shake from './dances/shake.js'
import jump from './dances/jump.js'
import twist from './dances/twist.js'
import vanish from './dances/vanish.js'
import color from './dances/color.js'
import radius from './dances/radius.js'

class Dancer {
  constructor() {
    this.dances = {}
    this.registerDance('size', pulse)
    this.registerDance('pulse', pulse)
    this.registerDance('shake', shake)
    this.registerDance('jump', jump)
    this.registerDance('twist', twist)
    this.registerDance('vanish', vanish)
    this.registerDance('color', color)
    this.registerDance('radius', radius)
  }

  registerDance(type, value) {
    this.dances[type] = value
  }

  dance(type, className, ratio, options) {
    let dance = type
    if( typeof type === 'string' ) {
      dance = this.dances[type] || this.dances['pulse']
    } 
    const elements = document.getElementsByClassName(className)
    Array.from(elements).forEach(elem => dance(elem, ratio, options))
  }
}

export default new Dancer