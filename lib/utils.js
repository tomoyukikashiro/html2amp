const axios = require('axios')
const fs = require('fs')
const path = require('path')

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

module.exports = {
  normalizeUrl: normalizeUrl,
  getRemoteFile: getRemoteFile,
  getRelativeFile: getRelativeFile
}
