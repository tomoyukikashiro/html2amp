const AmpOptimizer = require('@ampproject/toolbox-optimizer')

const ampOptimizer = AmpOptimizer.create()

exports.optimizer = (html, options) => {
  if (!options.optimize) return Promise.resolve(html)
  return ampOptimizer.transformHtml(html)
}
