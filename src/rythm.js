export default class Rythm {

  constructor() {
    this._browserAudioCtx = AudioContext || webkitAudioContext
    this._audioCtx = new this._browserAudioCtx()
    this._analyser = this._audioCtx.createAnalyser()
    this._gain = this._audioCtx.createGain()
    this._source = {}
    this._audio = {}
    this._hzHistory = []
    this._analyser.fftSize = 2048
    this.stopped = false
    this._rythmInputTypeList = {
      "TRACK" : 0,
      "STREAM" : 1,
      "EXTERNAL" : 2,
    }
    //Public
    this.startingScale = 0.75
    this.pulseRatio = 0.50
    this.maxValueHistory = 100
    this.rythmMapping = []

    //Defaults classes
    this.addRythm('rythm-bass','size',0,10)
    this.addRythm('rythm-medium','size',150,40)
    this.addRythm('rythm-high','size',400,200)
  }


  addRythm = (elementClass, type, startValue, nbValue) => {
    this.rythmMapping.push({
      elementClass: elementClass,
      type:type,
      startValue: startValue,
      nbValue: nbValue
    })
  }

  _createSourceFromAudioElement = (audioElement) => {
    return this._audioCtx.createMediaElementSource(this._audio)
  }

  connectExternalAudioElement = (audioElement) => {
    this._audio = audioElement
    this._rythmInputType = this._rythmInputTypeList['EXTERNAL']
    this._source = this._createSourceFromAudioElement(this._audio)
    this._connectSource(this._source)
  }

  _connectSource = (source) => {
    source.connect(this._gain)
    this._gain.connect(this._analyser)
    if(this._rythmInputType !== this._rythmInputTypeList['STREAM']){
      this._analyser.connect(this._audioCtx.destination)
      this._audio.addEventListener("ended", this.stop)
    }
  }

  setMusic = (trackUrl) => {
    this._audio = new Audio(trackUrl)
    this._rythmInputType = this._rythmInputTypeList['TRACK']
    this._source = this._createSourceFromAudioElement(this._audio)
    this._connectSource(this._source)
  }

  plugMicrophone = () => {
    return this._getMicrophoneStream().then(stream => {
      this._audio = stream
      this._rythmInputType = this._rythmInputTypeList['STREAM']
      this._source = this._audioCtx.createMediaStreamSource(stream)
      this._connectSource(this._source)
    })
  }

  _getMicrophoneStream = () => {
    navigator.getUserMedia = (navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia)
    return new Promise((resolve, reject) => {
      navigator.getUserMedia({audio:true},
        medias => resolve(medias),
        error => reject(error)
      )
    })
  }

  setGain = (value) => {
    this._gain.gain.value = value
  }

  start = () => {
    this._hzHistory = []
    this._frequences = new Uint8Array(this._analyser.frequencyBinCount)
    if(this._rythmInputType === this._rythmInputTypeList['TRACK']){
      this._audio.play()
    }
    this.stopped = false
    this.renderRythm()
  }

  stop = () => {
    if (this._rythmInputType === this._rythmInputTypeList['TRACK']) {
      this._audio.pause()
    } else if (this._rythmInputType === this._rythmInputTypeList['STREAM']) {
      this._audio.getAudioTracks()[0].enabled = false
    }
    this.rythmMapping.forEach(mappingItem => {
      const elements = document.getElementsByClassName(mappingItem.elementClass)
      Array.from(elements).forEach(elem => elem.style.transform = 'initial')
    })
    this.stopped = true
  }


  renderRythm = () => {
    if(this.stopped){
      return
    }
    this._analyser.getByteFrequencyData(this._frequences)
    this._frequences.forEach((frequence, i) => {
      if(!this._hzHistory[i]){
        this._hzHistory[i] = []
      }
      if(this._hzHistory[i].length > this.maxValueHistory){
        this._hzHistory[i].shift()
      }
      this._hzHistory[i].push(frequence)
    })
    this.rythmMapping.forEach(mappingItem => {
      switch (mappingItem.type) {
        default:
          this.pulseSize(mappingItem.elementClass, this.getAverageRatio(mappingItem.startValue, mappingItem.nbValue))
      }
    })
    requestAnimationFrame(this.renderRythm)
  }

  getAverageRatio = (startingValue, nbValue) => {
    let total = 0
    for(let i=startingValue; i<nbValue+startingValue; i++){
      total += this.getRatio(i)
    }
    return total/nbValue
  }

  getRatio = (index) => {
    let min = 255
    let max = 0
    this._hzHistory[index].forEach(value => {
      if(value < min){
        min = value
      }
      if(value > max){
        max = value
      }
    })
    const scale = max - min
    const actualValue = this._frequences[index] -min
    const percentage = (actualValue/scale)
    return this.startingScale + (this.pulseRatio * percentage)
  }

  pulseSize = (name, value) => {
    const elements = document.getElementsByClassName(name)
    Array.from(elements).forEach(elem => elem.style.transform = 'scale('+value+')')
  }
}
