const CleanCss = require('clean-css')
const utils = require('./utils')

const build = (styles) => {
  const styleStr = styles.map(style => new CleanCss().minify(style).styles).join('')
  return styleStr.replace(/!important/g, '')
}

const css = async ($, options) => {
  const styleSheetElements = $('link[rel="stylesheet"]')
  const styleElements = $('style')
  const cssUrls = styleSheetElements.map((i, node) => utils.normalizeUrl($(node).attr('href'))).get()
  const styles = cssUrls.map(async url => {
    if (url.startsWith('http')) {
      const text = await utils.getRemoteFile(url)
      return text
    } else {
      const text = utils.getRelativeFile(url, options.cwd)
      return text
    }
  })
  const texts = await Promise.all(styles)
  styleElements.each((i, element) => {
    texts.push($(element).html())
  })
  const styleStr = build(texts)
  $('head').append(`<style amp-custom>${styleStr}</style>`)
  styleSheetElements.remove()
  styleElements.remove()
  return $
}

module.exports = css
