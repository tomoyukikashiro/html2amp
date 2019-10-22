const CleanCss = require('clean-css')
const cheerio = require('cheerio')
const utils = require('./utils')

const build = (styles) => {
  const styleStr = styles.map(style => new CleanCss().minify(style).styles).join('')
  return styleStr.replace(/!important/g, '')
}

const callbacks = (elementString, cssText, options = {}) => {
  const plugins = options.cssPlugins || []
  return plugins.reduce((css, plugin) => {
    return plugin(elementString, css, options)
  }, cssText)
}

const css = async ($, options) => {
  const styleSheetElements = $('link[rel="stylesheet"]')
  const styleElements = $('style')
  const urlElms = Array.from(styleSheetElements).map((node, i) => {
    const $element = cheerio.load(node)
    return {
      url: utils.normalizeUrl($(node).attr('href')),
      element: $element.html()
    }
  })
  const styles = urlElms.map(async ({ url, elementString }) => {
    if (url.startsWith('http')) {
      const text = await utils.getRemoteFile(url)
      return callbacks(elementString, text, options)
    } else {
      const text = utils.getRelativeFile(url, options.cwd)
      return callbacks(elementString, text, options)
    }
  })
  const texts = await Promise.all(styles)
  styleElements.each((i, element) => {
    const $element = cheerio.load(element)
    texts.push(callbacks($element.html(), $(element).html(), options))
  })
  const styleStr = build(texts)
  $('head').append(`<style amp-custom>${styleStr}</style>`)
  styleSheetElements.remove()
  styleElements.remove()
  return $
}

module.exports = css
