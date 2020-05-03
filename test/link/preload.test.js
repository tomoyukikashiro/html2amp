const cheerio = require('cheerio')
const assert = require('../assert')
const canonical = require('../../lib/link/preload')
const htmlFactory = require('../html')

describe('preload', function () {
  describe('If there is link tag for preloading script', function () {
    const html = htmlFactory({ head: '<link rel="preload" as="script" href="https://example.com/test.js">' })
    it('should be removed', function () {
      const $ = canonical(cheerio.load(html))
      assert($, htmlFactory({ head: '' }))
    })
  })
  describe('If there is link tag for preloading fetch resource', function () {
    const html = htmlFactory({ head: '<link rel="preload" as="fetch" href="https://example.com/test.json">' })
    it('should be removed', function () {
      const $ = canonical(cheerio.load(html))
      assert($, htmlFactory({ head: '' }))
    })
  })
  describe('If there is link tag for preloading style', function () {
    const html = htmlFactory({ head: '<link rel="preload" as="style" href="https://example.com/test.css">' })
    it('shouldn\'t be removed', function () {
      const $ = canonical(cheerio.load(html))
      assert($, htmlFactory({ head: '<link rel="preload" as="style" href="https://example.com/test.css">' }))
    })
  })
})
