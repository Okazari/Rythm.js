const generateFontVariationSettings = (value, options) => Object.entries(options).reduce((fontVariationSettings,[key, { min, max }]) => {
    const computedValue = ((max - min) * value + min)
    return `${fontVariationSettings ? `${fontVariationSettings},` : ''} '${key}' ${computedValue}`
}, null)

export default (elem, value, options = {}) => {
    elem.style.fontVariationSettings = generateFontVariationSettings(value, options)
}
  
export const reset = elem => {
    elem.style.fontVariationSettings = null
}
  