const cheerio = require('cheerio')
const htmlFactory = require('./html')
const img = require('../lib/img')
const assert = require('./assert')
const path = require('path')

describe('img', function () {
  describe('There is remote img', function () {
    describe('the url is http', function () {
      const html = htmlFactory({ body: '<img alt="test" src="http://dummyimage.com/100x200/000/fff.jpg" />' })
      it('should be replaced with custom img tag', async function () {
        const $ = await img(cheerio.load(html))
        const expected = htmlFactory({ body: '<amp-img src="http://dummyimage.com/100x200/000/fff.jpg" alt="test" width="100" height="200" layout="responsive"></amp-img>' })
        assert($, expected)
      })
    })
    describe('the url is https', function () {
      const html = htmlFactory({ body: '<img alt="test" src="https://dummyimage.com/100x200/000/fff.jpg" />' })
      it('should be replaced with custom img tag', async function () {
        const $ = await img(cheerio.load(html))
        const expected = htmlFactory({ body: '<amp-img src="https://dummyimage.com/100x200/000/fff.jpg" alt="test" width="100" height="200" layout="responsive"></amp-img>' })
        assert($, expected)
      })
    })
  })
  describe('There is a relative image pth', function () {
    const html = htmlFactory({ body: '<img alt="test" src="./images/test.jpg" />' })
    it('should be replaced with custom img tag', async function () {
      const $ = await img(cheerio.load(html), { cwd: path.join(process.cwd(), 'test/fixtures') })
      const expected = htmlFactory({ body: '<amp-img src="./images/test.jpg" alt="test" width="100" height="200" layout="responsive"></amp-img>' })
      assert($, expected)
    })
  })
})
