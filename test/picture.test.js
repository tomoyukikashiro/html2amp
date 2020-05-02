const cheerio = require('cheerio')
const htmlFactory = require('./html')
const assert = require('./assert')
const picture = require('../lib/picture')

describe('picture', () => {
  describe('There is a picture tag', () => {
    const str = `<picture>
                  <source
                    type="image/png"
                    srcset="http://dummyimage.com/100x200/000/fff.png 1x, http://dummyimage.com/200x400/000/fff.png 2x">
                  <source
                    type="image/jpg"
                    srcset="http://dummyimage.com/100x200/000/fff.jpg 1x, http://dummyimage.com/200x400/000/fff.jpg 2x">
                  <img alt="test" src="http://dummyimage.com/200x400/000/fff.jpg" />
                 </picture>`
    const html = htmlFactory({ body: str })
    it('should be replaced with custom img tag', async () => {
      const $ = await picture(cheerio.load(html))
      const expectedTag = '<amp-img src="http://dummyimage.com/100x200/000/fff.png" alt="test" width="100" height="200" layout="responsive" srcset="http://dummyimage.com/100x200/000/fff.png 1x, http://dummyimage.com/200x400/000/fff.png 2x"><amp-img src="http://dummyimage.com/100x200/000/fff.jpg" alt="test" width="100" height="200" layout="responsive" srcset="http://dummyimage.com/100x200/000/fff.jpg 1x, http://dummyimage.com/200x400/000/fff.jpg 2x"></amp-img><amp-img src="http://dummyimage.com/200x400/000/fff.jpg" alt="test" width="200" height="400" layout="responsive" fallback=""></amp-img></amp-img>'
      const expected = htmlFactory({ body: expectedTag })
      assert($, expected)
    })
  })
})
