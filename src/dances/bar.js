export default (elem, value, options = {}) => {
  const from = options.from || [0,0,0]
  const to = options.to || [255,255,255]
  const scaleR = (to[0] - from[0]) * value
  const scaleG = (to[1] - from[1]) * value
  const scaleB = (to[2] - from[2]) * value
  var color = `rgb(${Math.floor(to[0] - scaleR)}, ${Math.floor(to[1] - scaleG)}, ${Math.floor(to[2] - scaleB)})`
  elem.style.position='relative'

  var rip1 = null
  if (elem.childNodes.length == 0) {
    rip1 = document.createElement("div");
    elem.appendChild(rip1);
    rip1.style.width = '100%'
    rip1.style.position='absolute'
    rip1.style.bottom='0'
    rip1.style.left='0'
  }else {
    rip1 = elem.childNodes[0]
  }
  rip1.style.backgroundColor = color
  rip1.style.height = "" + (value * 100) + "%"
}
