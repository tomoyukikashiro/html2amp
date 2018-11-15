const cheerio = require('cheerio')
const assert = require('../assert.js')
const htmlFactory = require('../html')
const viewport = require('../../lib/meta/viewport')

describe('meta', function () {
  describe('viewport tag exist', function () {
    const html = htmlFactory({ head: '<meta name="viewport" content="">' })
    it('should be correct viewport', function () {
      const $ = viewport(cheerio.load(html))
      assert($, htmlFactory({ head: '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">' }))
    })
  })
  describe('charset tag does not exist', function () {
    const html = htmlFactory()
    it('should be correct viewport', function () {
      const $ = viewport(cheerio.load(html))
      assert($, htmlFactory({ head: '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">' }))
    })
  })
})
