const cheerio = require('cheerio')
const assert = require('../assert')
const amphtml = require('../../lib/link/amphtml')
const htmlFactory = require('../html')

describe('amphtml', function () {
  describe('If there is link tag for amphtml', function () {
    const html = htmlFactory({ head: '<link rel="amphtml" href="https://example.com/amp/test">' })
    it('should be removed', function () {
      const $ = amphtml(cheerio.load(html))
      assert($, htmlFactory({ head: '' }))
    })
  })
  describe('If there is link tag for not amphtml', function () {
    const html = htmlFactory({ head: '<link rel="other" href="https://example.com/amp/test">' })
    it('shouldn\'t be removed', function () {
      const $ = amphtml(cheerio.load(html))
      assert($, htmlFactory({ head: '<link rel="other" href="https://example.com/amp/test">' }))
    })
  })
})
