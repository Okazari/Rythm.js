import pulse, {reset as pulseReset} from './dances/pulse.js'
import shake, {reset as shakeReset} from './dances/shake.js'
import jump, {reset as jumpReset} from './dances/jump.js'
import twist, {reset as twistReset} from './dances/twist.js'
import vanish, {reset as vanishReset} from './dances/vanish.js'
import color, {reset as colorReset} from './dances/color.js'

class Dancer {
  constructor() {
    this.dances = {}
    this.resets = {}
    this.registerDance('size', pulse, pulseReset)
    this.registerDance('pulse', pulse, pulseReset)
    this.registerDance('shake', shake, shakeReset)
    this.registerDance('jump', jump, jumpReset)
    this.registerDance('twist', twist, twistReset)
    this.registerDance('vanish', vanish, vanishReset)
    this.registerDance('color', color, colorReset)
  }

  registerDance(type, dance, reset = () => {}) {
    this.dances[type] = dance
    this.resets[type] = reset
  }

  dance(type, className, ratio, options) {
    let dance = type
    if( typeof type === 'string' ) {
      dance = this.dances[type] || this.dances['pulse']
    } 
    const elements = document.getElementsByClassName(className)
    Array.from(elements).forEach(elem => dance(elem, ratio, options))
  }

  reset(type, className) {
    let reset = type
    if( typeof type === 'string' ) {
      reset = this.resets[type] || this.resets['pulse']
    } 
    const elements = document.getElementsByClassName(className)
    Array.from(elements).forEach(elem => reset(elem))
  }
}

export default new Dancer