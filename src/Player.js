import Analyser from './Analyser.js'

class Player {
  constructor(forceAudioContext) {
    this.browserAudioCtx = window.AudioContext || window.webkitAudioContext
    this.audioCtx = forceAudioContext || new this.browserAudioCtx()
    this.connectedSources = []
    Analyser.initialise(this.audioCtx.createAnalyser())
    this.gain = this.audioCtx.createGain()
    this.source = {}
    this.audio = {}
    this.hzHistory = []
    this.inputTypeList = {
      TRACK: 0,
      STREAM: 1,
      EXTERNAL: 2,
    }
  }

  createSourceFromAudioElement = audioElement => {
    audioElement.setAttribute('rythm-connected', this.connectedSources.length)
    const source = this.audioCtx.createMediaElementSource(audioElement)
    this.connectedSources.push(source)
    return source
  }

  connectExternalAudioElement = audioElement => {
    this.audio = audioElement
    this.currentInputType = this.inputTypeList['EXTERNAL']
    const connectedIndex = audioElement.getAttribute('rythm-connected')
    if (!connectedIndex) {
      this.source = this.createSourceFromAudioElement(this.audio)
    } else {
      this.source = this.connectedSources[connectedIndex]
    }
    this.connectSource(this.source)
  }

  connectSource = source => {
    source.connect(this.gain)
    this.gain.connect(Analyser.analyser)
    if (this.currentInputType !== this.inputTypeList['STREAM']) {
      Analyser.analyser.connect(this.audioCtx.destination)
      this.audio.addEventListener('ended', this.stop)
    } else {
      Analyser.analyser.disconnect()
    }
  }

  setMusic = trackUrl => {
    this.audio = new Audio(trackUrl)
    this.currentInputType = this.inputTypeList['TRACK']
    this.source = this.createSourceFromAudioElement(this.audio)
    this.connectSource(this.source)
  }

  setGain = value => {
    this.gain.gain.value = value
  }

  plugMicrophone = () => {
    return this.getMicrophoneStream().then(stream => {
      this.audio = stream
      this.currentInputType = this.inputTypeList['STREAM']
      this.source = this.audioCtx.createMediaStreamSource(stream)
      this.connectSource(this.source)
    })
  }

  getMicrophoneStream = () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    return new Promise((resolve, reject) => {
      navigator.getUserMedia(
        { audio: true },
        medias => resolve(medias),
        error => reject(error)
      )
    })
  }

  start = () => {
    if (this.currentInputType === this.inputTypeList['TRACK']) {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume()
          .then(() => this.audio.play())
      } else {
        this.audio.play()
      }
    }
  }

  stop = () => {
    if (this.currentInputType === this.inputTypeList['TRACK']) {
      this.audio.pause()
    } else if (this.currentInputType === this.inputTypeList['STREAM']) {
      this.audio.getAudioTracks()[0].enabled = false
    }
  }
}

export default Player
