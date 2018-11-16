const utils = require('./utils')
const sizeOf = require('image-size')
const path = require('path')

const img = async ($, options = {}) => {
  const imageElements = $('img')
  const promises = imageElements.map(async (i, node) => {
    const element = $(node)
    const src = element.attr('src')
    const alt = element.attr('alt') || ''
    const url = utils.normalizeUrl(src)
    let size = null
    let img = null
    if (url.startsWith('http')) {
      const remoteOptions = { responseType: 'arraybuffer', headers: { 'Content-Type': 'image/png' } }
      img = await utils.getRemoteFile(url, remoteOptions)
      size = sizeOf(img)
    } else {
      utils.getRelativeFile(url, options.cwd)
      size = sizeOf(path.join(options.cwd, url))
    }
    const width = element.attr('width') || size.width
    const height = element.attr('height') || size.height
    const ampImage = `<amp-img src="${src}" alt="${alt}" width="${width}" height="${height}" layout="responsive" />`
    element.replaceWith(ampImage)
  }).get()
  await Promise.all(promises)
  return $
}

module.exports = img
