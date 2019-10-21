const toolbox = require('../lib/toolbox')

const ampFactory = () => {
  return `
  <!doctype html>
  <html ⚡ lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,minimum-scale=1">
      <meta name="description" content="This is the AMP Boilerplate.">
      <link rel="preload" as="script" href="https://cdn.ampproject.org/v0.js">
      <script async src="https://cdn.ampproject.org/v0.js"></script>
      <style amp-custom>
      </style>
      <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
      <link rel="canonical" href=".">
      <title>My AMP Page</title>
    </head>
    <body>
      <h1>Hello World</h1>
    </body>
  </html>`
}

describe('toolbox', function () {
  describe('optimizer', function () {
    describe('optimize option is false', () => {
      const amphtml = ampFactory()
      it('nothing happen', async () => {
        const optimizedHtml = await toolbox.optimizer(amphtml, { optimize: false })
        expect(optimizedHtml).toEqual(amphtml)
      })
    })
    describe('optimize option is true', () => {
      const amphtml = ampFactory()
      it('html will be optimized', async () => {
        const optimizedHtml = await toolbox.optimizer(amphtml, { optimize: true })
        expect(optimizedHtml).toContain('i-amphtml-version')
      })
    })
  })
})
