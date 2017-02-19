import player from './Player.js'
import analyser from './Analyser.js'
import dancer from './Dancer.js'

export default class Rythm {

  constructor() {
    this.player = player
    this.analyser = analyser
    this.dancer = dancer
    this.rythms = []
    this.addRythm('rythm-bass','jump',0,10)
    this.addRythm('rythm-medium','jump',150,40)
    this.addRythm('rythm-high','jump',400,200)
  }

  connectExternalAudioElement = (audioElement) => this.player.connectExternalAudioElement (audioelement)

  setMusic = (url) => this.player.setMusic(url)

  plugMicrophone = () => this.player.plugMicrophone()

  setGain = (value) => this.player.setGain(value)

  start = () => {
    this.stopped = false
    this.player.start()
    this.analyser.reset()
    this.renderRythm()
  }

  renderRythm = () => {
    if (this.stopped) return
    this.analyser.analyse()
    this.rythms.forEach(mappingItem => {
      const { type, elementClass, nbValue, startValue, options } = mappingItem
      this.dancer.dance(type, elementClass, this.analyser.getRangeAverageRatio(startValue, nbValue), options)
    })
    requestAnimationFrame(this.renderRythm)
  }

  stop = () => { 
    this.stopped = true
    this.player.stop()
  }

  addRythm = (elementClass, type, startValue, nbValue) => {
    this.rythms.push({
      elementClass,
      type,
      startValue,
      nbValue
    })
  }
}