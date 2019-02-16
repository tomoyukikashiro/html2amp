const cheerio = require('cheerio')
const assert = require('./assert')
const link = require('../lib/link')
const htmlFactory = require('./html')

describe('link', function () {
  const head = '<link rel="canonical" href="https://example.com/test/article/">'

  describe('if there is a link which href starts with /', function () {
    const html = htmlFactory({ head, body: '<a href="/test"></a>' })
    it('should be replaced with origin in canonical', function () {
      const $ = link(cheerio.load(html))
      assert($, htmlFactory({ head, body: '<a href="https://example.com/test"></a>' }))
    })
  })

  describe('if there is a link which href starts with ./test', function () {
    const html = htmlFactory({ head, body: '<a href="./bar"></a>' })
    it('should be replaced with origin in canonical', function () {
      const $ = link(cheerio.load(html))
      assert($, htmlFactory({ head, body: '<a href="https://example.com/test/article/bar"></a>' }))
    })
  })

  describe('if there is a link which href starts with ../test', function () {
    const html = htmlFactory({ head, body: '<a href="../test"></a>' })
    it('should be replaced with origin in canonical', function () {
      const $ = link(cheerio.load(html))
      assert($, htmlFactory({ head, body: '<a href="https://example.com/test/test"></a>' }))
    })
  })

  describe('if there is a link which href starts with `test`', function () {
    const html = htmlFactory({ head, body: '<a href="test"></a>' })
    it('should be replaced with origin in canonical', function () {
      const $ = link(cheerio.load(html))
      assert($, htmlFactory({ head, body: '<a href="https://example.com/test/article/test"></a>' }))
    })
  })

  describe('if there is a link which href starts with http', function () {
    const html = htmlFactory({ head, body: '<a href="https://example.com"></a>' })
    it('should be replaced with origin in canonical', function () {
      const $ = link(cheerio.load(html))
      assert($, htmlFactory({ head, body: '<a href="https://example.com"></a>' }))
    })
  })

  describe('if there is a link which href starts with //', function () {
    const html = htmlFactory({ head, body: '<a href="//example.com"></a>' })
    it('should be replaced with origin in canonical', function () {
      const $ = link(cheerio.load(html))
      assert($, htmlFactory({ head, body: '<a href="//example.com"></a>' }))
    })
  })
})
