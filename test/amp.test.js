const cheerio = require('cheerio')
const assert = require('./assert.js')
const amp = require('../lib/amp')
const htmlFactory = require('./html')

describe('amp', function () {
  describe('if there is not amp attribute in html tag', function () {
    it('amp attribute should be added', function () {
      const html = htmlFactory()
      const $ = amp(cheerio.load(html))
      assert($, '<html amp=""><head></head><body></body></html>')
    })
  })
  describe('if there is already amp attribute in html tag', function () {
    it('amp attribute should be added', function () {
      const html = '<html amp=""><head></head><body></body></html>'
      const $ = amp(cheerio.load(html))
      assert($, '<html amp=""><head></head><body></body></html>')
    })
  })
})
