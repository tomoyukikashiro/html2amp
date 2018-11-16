const utils = require('../utils')

const googleanalytics = ($, options) => {
  if (options.gaConfigPath) {
    const config = utils.getRelativeFile(options.gaConfigPath, options.cwd)
    const $script = $('<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js" />')
    const $config = $(`<amp-analytics type="googleanalytics"/><script type="application/json">${config}</script></amp-analytics>`)
    $('body').prepend($config)
    $('head').prepend($script)
  }
  return $
}

module.exports = googleanalytics
