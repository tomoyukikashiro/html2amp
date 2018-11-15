const cheerio = require('cheerio')
const assert = require('./assert.js')
const iframe = require('../lib/iframe')
const htmlFactory = require('./html')

const ampScript = '<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>'

describe('iframe', function () {
  describe('if there is iframe tag', function () {
    const html = htmlFactory({ body: '<iframe src="https://example.com"></iframe>' })
    it('should be replaced with amp-iframe', function () {
      const $ = iframe(cheerio.load(html))
      assert($, `<html><head>${ampScript}</head><body><amp-iframe src="https://example.com"></amp-iframe></body></html>`)
    })
  })
})
