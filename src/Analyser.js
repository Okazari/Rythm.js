class Analyser {

  constructor () {
    this.startingScale = 0
    this.pulseRatio = 1
    this.maxValueHistory = 100
    this.hzHistory = []
  }

  initialise = (analyser) => {
    this.analyser = analyser
    this.analyser.fftSize = 2048
  }

  reset = () => {
    this.hzHistory = []
    this.frequences = new Uint8Array(this.analyser.frequencyBinCount)
  }

  analyse = () => {
    this.analyser.getByteFrequencyData(this.frequences)
    for(let i=0; i < this.frequences.length; i++){
      if(!this.hzHistory[i]){
        this.hzHistory[i] = []
      }
      if(this.hzHistory[i].length > this.maxValueHistory){
        this.hzHistory[i].shift()
      }
      this.hzHistory[i].push(this.frequences[i])
    }
  }

  getRangeAverageRatio = (startingValue, nbValue) => {
    let total = 0
    for(let i=startingValue; i<nbValue+startingValue; i++){
      total += this.getFrequenceRatio(i)
    }
    return total/nbValue
  }

  getFrequenceRatio = (index) => {
    let min = 255
    let max = 0
    this.hzHistory[index].forEach(value => {
      if(value < min){
        min = value
      }
      if(value > max){
        max = value
      }
    })
    const scale = max - min
    const actualValue = this.frequences[index] -min
    const percentage = scale === 0 ? 0 : (actualValue/scale);
    return this.startingScale + (this.pulseRatio * percentage)
  }

}

export default new Analyser
