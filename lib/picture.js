const utils = require('./utils')

const sourceToAmp = async (nodes, options, alt = '') => {
  const sourcePromises = nodes.map(async (i, source) => {
    const ampTag = await utils.srcNode(options.cwd, { alt, ...source.attribs })
    return ampTag
  }).get()
  const amps = await Promise.all(sourcePromises)
  return amps
}

const imgToAmp = async (node, options) => {
  const tag = await utils.srcNode(options.cwd, { fallback: '', ...node.attribs })
  return tag
}

const picture = async ($, options = {}) => {
  const pictureElements = $('picture')
  const promises = pictureElements.map(async (i, node) => {
    const element = $(node)
    const img = element.find('img').get(0)

    // source tag
    const [main, ...rests] = await sourceToAmp(element.find('source'), options, img.attribs.alt)
    const mainAmp = $(main)
    mainAmp.append(rests.join(''))
    // img tag
    mainAmp.append(await imgToAmp(img, options))

    element.replaceWith(mainAmp)
  }).get()
  await Promise.all(promises)
  return $
}

module.exports = picture
