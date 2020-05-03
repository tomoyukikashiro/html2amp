
const cheerio = require('cheerio')
const amp = require('./lib/amp')
const css = require('./lib/css')
const img = require('./lib/img')
const picture = require('./lib/picture')
const script = require('./lib/script')
const charset = require('./lib/meta/charset')
const viewport = require('./lib/meta/viewport')
const ga = require('./lib/googleanalytics')
const iframe = require('./lib/iframe')
const boilerplate = require('./lib/boilerplate')
const serviceworker = require('./lib/serviceWorker')
const link = require('./lib/link/canonical')
const toolbox = require('./lib/toolbox')
const html = require('./lib/html')

const html2amp = async (htmlString, options = {}) => {
  let $ = cheerio.load(htmlString)
  $ = amp($, options)
  $ = await css($, options)
  $ = await picture($, options) // should be done before img
  $ = await img($, options)
  $ = script($, options)
  $ = charset($, options)
  $ = viewport($, options)
  $ = ga($, options)
  $ = iframe($, options)
  $ = link($)
  $ = serviceworker($, options)
  $ = boilerplate($, options)
  htmlString = html($, options)
  htmlString = await toolbox.optimizer(htmlString, options)
  return htmlString
}

module.exports = html2amp
