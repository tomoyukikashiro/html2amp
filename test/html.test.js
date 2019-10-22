const cheerio = require('cheerio')
const html = require('../lib/html')
const htmlFactory = require('./html')

describe('html', function () {
  describe('There is a plugin', function () {
    const htmlMock = htmlFactory({ body: '<h1>Normal HTML</h1>' })
    it('should be modified by plugin', function () {
      const plugin = htmlString => {
        return htmlString.replace('Normal', 'AMP')
      }
      const options = {
        htmlPlugins: [plugin]
      }
      const htmlString = html(cheerio.load(htmlMock), options)
      expect(htmlString).toEqual(htmlFactory({ body: '<h1>AMP HTML</h1>' }))
    })
  })
})
