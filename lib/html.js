const callbacks = (htmlString, options = {}) => {
  const plugins = options.htmlPlugins || []
  return plugins.reduce((html, plugin) => {
    return plugin(html, options)
  }, htmlString)
}

const html = ($, options) => {
  return callbacks($.html(), options)
}

module.exports = html
