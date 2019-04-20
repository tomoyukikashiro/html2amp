const axios = require('axios')
const fs = require('fs')
const path = require('path')
const sizeOf = require('image-size')
const uriToBuffer = require('data-uri-to-buffer')

const normalizeUrl = (url) => {
  if (url.startsWith('http')) {
    return url
  } else if (url.startsWith('//')) {
    return `https:${url}`
  } else {
    // relative file path or data uri
    return url
  }
}

async function getRemoteFile (url, options = {}) {
  try {
    const file = await axios.get(url, options).then(response => response.data)
    return file
  } catch (e) {
    console.error(`Fetching ${url} failed.`)
  }
}

const getRelativeFile = (url, cwd) => {
  const filePath = path.join(cwd, url)
  try {
    if (fs.existsSync(filePath)) {
      return String(fs.readFileSync(filePath))
    } else {
      throw new Error()
    }
  } catch (e) {
    console.error(`Reading ${filePath} failed.`)
  }
}

const normalizeSrc = (src, srcset) => {
  if (src) return src
  const set = srcset.split(',')[0]
  return set.split(' ')[0]
}

const srcNode = async (cwd, attributes) => {
  const { src, alt = '', ...attrs } = attributes
  const url = normalizeUrl(normalizeSrc(src, attributes.srcset))
  let size = null
  let img = null
  if (url.startsWith('http')) {
    const remoteOptions = { responseType: 'arraybuffer' }
    img = await getRemoteFile(url, remoteOptions)
    size = sizeOf(img)
  } else if (url.startsWith('data:')) {
    const buffer = uriToBuffer(url)
    size = sizeOf(buffer)
  } else {
    getRelativeFile(url, cwd)
    size = sizeOf(path.join(cwd, url))
  }
  const _attrs = { src: url, alt, width: size.width, height: size.height, layout: 'responsive', ...attrs }
  const _attrsStr = Object.keys(_attrs).map(key => `${key}="${_attrs[key]}"`).join(' ')
  return `<amp-img ${_attrsStr}></amp-img>`
}

module.exports = {
  normalizeUrl: normalizeUrl,
  getRemoteFile: getRemoteFile,
  getRelativeFile: getRelativeFile,
  srcNode: srcNode
}
