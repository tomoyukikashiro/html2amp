const utils = require('./utils')

const img = async ($, options = {}) => {
  const imageElements = $('img')
  const promises = imageElements.map(async (i, node) => {
    const ampImage = await utils.srcNode(options.cwd, node.attribs)
    const element = $(node)
    element.replaceWith(ampImage)
  }).get()
  await Promise.all(promises)
  return $
}

module.exports = img
