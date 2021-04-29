const cheerio = require('cheerio')
const htmlFactory = require('./html')
const img = require('../lib/img')
const assert = require('./assert')
const path = require('path')

const uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADIBAMAAADsElnyAAAAHlBMVEUAAAD///8/Pz+/v78fHx9fX19/f3+fn5/f39+Pj4+NSOJ2AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAsUlEQVRoge3RvQ6CMBSG4S+mLV4GibfgBZwJV0IU48YgzgzcfyxoiX8ERof3SWj4mp70tJUAAAAAAAAAJC5+9hFsZu1gZ77tVZ+fa8IjTPkHX1uhzDXq0kyIoX/J300FqxR8rkabMg4aQ5uPvzOCXeUL01E6ZUM3VTBdxryixO+HbZsVJakxZW3MB61obDp+70u5TkvHjyXpkp0p1/bWLl3y4O0ppcWnBAAAAAAAAP7GHZXZIBjdmXmfAAAAAElFTkSuQmCC'

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
  describe('There is a protocol relative url', function () {
    const html = htmlFactory({ body: '<img alt="test" src="//dummyimage.com/100x200/000/fff.jpg" />' })
    it('should be replaced with a custom img tag', async function () {
      const $ = await img(cheerio.load(html))
      const expected = htmlFactory({ body: '<amp-img src="https://dummyimage.com/100x200/000/fff.jpg" alt="test" width="100" height="200" layout="responsive"></amp-img>' })
      assert($, expected)
    })
  })
  describe('There is data uri', function () {
    const html = htmlFactory({ body: `<img alt="test" src="${uri}" />` })
    it('should be replaced with custom img tag', async function () {
      const $ = await img(cheerio.load(html))
      const expected = htmlFactory({ body: `<amp-img src="${uri}" alt="test" width="100" height="200" layout="responsive"></amp-img>` })
      assert($, expected)
    })
  })
  describe('There is a relative image path', function () {
    const html = htmlFactory({ body: '<img alt="test" src="./images/test.jpg" />' })
    it('should be replaced with custom img tag', async function () {
      const $ = await img(cheerio.load(html), { cwd: path.join(process.cwd(), 'test/fixtures') })
      const expected = htmlFactory({ body: '<amp-img src="./images/test.jpg" alt="test" width="100" height="200" layout="responsive"></amp-img>' })
      assert($, expected)
    })
  })
  describe('There is a loading attribute', function () {
    const html = htmlFactory({ body: '<img alt="test" loading="lazy" src="./images/test.jpg" />' })
    it('should be removed', async () => {
      const $ = await img(cheerio.load(html), { cwd: path.join(process.cwd(), 'test/fixtures') })
      const expected = htmlFactory({ body: '<amp-img src="./images/test.jpg" alt="test" width="100" height="200" layout="responsive"></amp-img>' })
      assert($, expected)
    })
  })
  describe('Unavailable images are ignored', function () {
    const html = htmlFactory({ body: '<img alt="test" loading="lazy" src="https://example.com/404.jpg" />' })
    it('amp-img tag should not be rendered', async () => {
      const $ = await img(cheerio.load(html), { cwd: path.join(process.cwd(), 'test/fixtures') })
      const expected = htmlFactory({ body: '' })
      assert($, expected)
    })
  })
})
