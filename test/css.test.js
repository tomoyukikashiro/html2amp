const cheerio = require('cheerio')
const htmlFactory = require('./html')
const css = require('../lib/css')
const path = require('path')

const assertCss = ($) => {
  expect($('style[amp-custom]').length).toEqual(1)
  expect($('style[amp-custom]').eq(0).html().length).toBeGreaterThan(0)
  expect($('style[amp-custom]').eq(0).html().includes('!important')).toBe(false)
}

describe('css', function () {
  describe('There is remote stylesheet', function () {
    describe('the url is http', function () {
      const html = htmlFactory({ head: '<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css">' })
      it('should be appended in custom style tag', async function () {
        const $ = await css(cheerio.load(html))
        assertCss($)
      })
    })
    describe('the url starts with //', function () {
      const html = htmlFactory({ head: '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css">' })
      it('should be appended in custom style tag', async function () {
        const $ = await css(cheerio.load(html))
        assertCss($)
      })
    })
  })
  describe('There is relative path stylesheet', function () {
    const html = htmlFactory({ head: '<link rel="stylesheet" href="./styles/test.css">' })
    it('should be appended in custom style tag', async function () {
      const $ = await css(cheerio.load(html), { cwd: path.join(process.cwd(), 'test/fixtures') })
      expect($('style[amp-custom]').eq(0).html()).toEqual('.test{color:red}')
    })
  })
  describe('There is inline style', function () {
    const html = htmlFactory({ head: '<style>.test{color: red !important;}</style>' })
    it('should be appended in custom style tag', async function () {
      const $ = await css(cheerio.load(html))
      assertCss($)
      expect($('style[amp-custom]').eq(0).html()).toEqual('.test{color:red}')
    })
  })
})
