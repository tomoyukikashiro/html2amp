const path = require('path')
const cheerio = require('cheerio')
const assert = require('../assert.js')
const ga = require('../../lib/googleanalytics')
const htmlFactory = require('../html')

const script = '<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>'
const expected = `<amp-analytics type="googleanalytics"><script type="application/json">{
  "vars": {
    "account": "UA-XXXXX-Y"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script></amp-analytics>`

describe('google analytics', function () {
  describe('if there is google analytics config', function () {
    const html = htmlFactory()
    it('should add amp-analytics', function () {
      const config = { gaConfigPath: 'googleanalytics.json', cwd: path.join(process.cwd(), 'test/fixtures/config') }
      const $ = ga(cheerio.load(html), config)
      assert($, htmlFactory({ head: script, body: expected }))
    })
  })
})
