const axios = require('axios')
const fs = require('fs')
const path = require('path')
const uriToBuffer = require('data-uri-to-buffer')
const probe = require('probe-image-size')

const normalizeUrl = (url) => {
  if (url.startsWith('http')) {
    return url
  } else if (url.startsWith('//')) {
    return `https:${url}`
  } else if (url.startsWith('data:')) {
    return url
  } else {
    // relative file path excluding query parameters and hash
    return url.split('?')[0].split('#')[0]
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
  let size = { width: null, height: null }
  if (url.startsWith('http')) {
    const result = await probe(url)
    size = { width: result.width, height: result.height }
  } else if (url.startsWith('data:')) {
    const buffer = uriToBuffer(url)
    const result = probe.sync(buffer)
    size = { width: result.width, height: result.height }
  } else {
    const fileStream = fs.createReadStream(path.join(cwd, url))
    const result = await probe(fileStream)
    size = { width: result.width, height: result.height }
    fileStream.destroy()
  }
  // remove loading, type attributes (#80, #104)
  let { loading, type, ..._attrs } = attrs
  _attrs = { src: url, alt, width: size.width, height: size.height, layout: 'responsive', ..._attrs }
  const _attrsStr = Object.keys(_attrs).map(key => `${key}="${_attrs[key]}"`).join(' ')
  return `<amp-img ${_attrsStr}></amp-img>`
}

module.exports = {
  normalizeUrl: normalizeUrl,
  getRemoteFile: getRemoteFile,
  getRelativeFile: getRelativeFile,
  srcNode: srcNode
}
