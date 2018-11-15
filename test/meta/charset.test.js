const cheerio = require('cheerio')
const assert = require('../assert.js')
const htmlFactory = require('../html')
const charset = require('../../lib/meta/charset')

describe('meta', function () {
  describe('charset tag exist', function () {
    describe('and it is not utf-8', function () {
      const html = htmlFactory({ head: '<meta charset="EUC-JP">' })
      it('should be utf-8', function () {
        const $ = charset(cheerio.load(html))
        assert($, htmlFactory({ head: '<meta charset="utf-8">' }))
      })
    })
    describe('and it is utf-8', function () {
      const html = htmlFactory({ head: '<meta charset="utf-8">' })
      it('should be utf-8', function () {
        const $ = charset(cheerio.load(html))
        assert($, htmlFactory({ head: '<meta charset="utf-8">' }))
      })
    })
  })
  describe('charset tag does not exist', function () {
    const html = htmlFactory()
    it('should be utf-8', function () {
      const $ = charset(cheerio.load(html))
      assert($, htmlFactory({ head: '<meta charset="utf-8">' }))
    })
  })
})
