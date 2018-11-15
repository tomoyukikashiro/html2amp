const cheerio = require('cheerio')
const assert = require('./assert.js')
const htmlFactory = require('./html')
const script = require('../lib/script')

describe('script', function () {
  describe('There is script tag', function () {
    const html = htmlFactory({ head: '<script>alert("hello")</script>' })
    it('should be removed', function () {
      const $ = script(cheerio.load(html))
      assert($, htmlFactory())
    })
  })
  describe('There is ld json script tag', function () {
    const html = htmlFactory({ head: '<script type="application/ld+json">{"test":"test"}</script>' })
    it('should not be removed', function () {
      const $ = script(cheerio.load(html))
      assert($, htmlFactory({ head: '<script type="application/ld+json">{"test":"test"}</script>' }))
    })
  })
})
