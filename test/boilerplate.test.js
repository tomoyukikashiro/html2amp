const cheerio = require('cheerio')
const assert = require('./assert.js')
const htmlFactory = require('./html')
const boilerplate = require('../lib/boilerplate')

const text = '<style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>'

describe('boilerplate', function () {
  describe('There is not boilerplate', function () {
    const html = htmlFactory({})
    it('should be added', function () {
      const $ = boilerplate(cheerio.load(html))
      assert($, htmlFactory({ head: text }))
    })
  })
  describe('There is boilerplate already', function () {
    const html = htmlFactory({ head: text })
    it('should be only one tag', function () {
      const $ = boilerplate(cheerio.load(html))
      assert($, htmlFactory({ head: text }))
    })
  })
})
