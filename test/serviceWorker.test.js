const cheerio = require('cheerio')
const htmlFactory = require('./html')
const sw = require('../lib/serviceWorker')
const assert = require('./assert')

describe('serviceWorker', function () {
  describe('There is not serviceWorker option', function () {
    const html = htmlFactory()
    it('custom element for that should not be added', function () {
      const $ = sw(cheerio.load(html), {})
      assert($, htmlFactory())
    })
  })
  describe('There is serviceWorker option', function () {
    const html = htmlFactory()
    const serviceWorker = {
      src: 'https://example.com/sw.js',
      'data-iframe-src': 'https://example.com/install-serviceworker.html',
      layout: 'nodisplay'
    }
    it('custom element for that should be added', function () {
      const $ = sw(cheerio.load(html), { serviceWorker })
      const expected = htmlFactory({
        head: '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>',
        body: '<amp-install-serviceworker src="https://example.com/sw.js" data-iframe-src="https://example.com/install-serviceworker.html" layout="nodisplay"></amp-install-serviceworker>'
      })
      assert($, expected)
    })
  })
})
