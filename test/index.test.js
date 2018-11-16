const path = require('path')
const amphtmlValidator = require('amphtml-validator')
const html2amp = require('../index')
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>test page</title>
    <link rel="canonical" href="https://example.com">
    <link rel="stylesheet" href="./styles/test.css" >
    <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" >
    <script>window.alert('This should be removed.')</script>
  </head> 
  <body>
    <img src="./images/test.jpg" alt="">
    <img src="https://dummyimage.com/600x400/000/fff.jpg" alt="">
    <iframe src="https://example.com" width="100" height="200" frameborder="0"></iframe> 
  </body>
</html>`
const expected = `<!DOCTYPE html><html amp=""><head><script async src="https://cdn.ampproject.org/v0.js"></script><style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript><script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script><script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
    <title>test page</title>
    <link rel="canonical" href="https://example.com">
    
    
    
  <style amp-custom="">.test{color:red}/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}</style><meta charset="utf-8"><meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"></head> 
  <body><amp-analytics type="googleanalytics"><script type="application/json">{
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
</script></amp-analytics>
    <amp-img src="./images/test.jpg" alt="" width="100" height="200" layout="responsive"></amp-img>
    <amp-img src="https://dummyimage.com/600x400/000/fff.jpg" alt="" width="600" height="400" layout="responsive"></amp-img>
    <amp-iframe src="https://example.com" width="100" height="200" frameborder="0"></amp-iframe> 
  
</body></html>`

describe('index', function () {
  it('should be generate AMP ⚡.', async function () {
    const config = { gaConfigPath: 'config/googleanalytics.json', cwd: path.join(process.cwd(), 'test/fixtures') }
    const amp = await html2amp(html, config)
    expect(amp).toEqual(expected)
  })
  it('should be valid by official validator', async function () {
    const config = { gaConfigPath: 'config/googleanalytics.json', cwd: path.join(process.cwd(), 'test/fixtures') }
    const amp = await html2amp(html, config)
    const validator = await amphtmlValidator.getInstance()
    const result = validator.validateString(amp)
    expect(result.status).toEqual('PASS')
  })
})
