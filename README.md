
# html2amp

- [![CircleCI](https://circleci.com/gh/tomoyukikashiro/html2amp/tree/master.svg?style=svg)](https://circleci.com/gh/tomoyukikashiro/html2amp/tree/master)
- ![node](https://img.shields.io/node/v/html2amp.svg)

html2amp is `simple` converter from HTML into AMP(Accelerated Mobile Pages).

## Motivation

This library allow you to convert `simple` html into AMP. What does the `simple` mean ?
As you know AMP has many restrictions to make it such as ...

- Some html tags are needed to be replaced by special one (`<amp-img />`, `<amp-iframe />`)
- CSS should be less than 50,000 bytes and it should be as inline

You can see full Specification here.
[AMP HTML Specification](https://www.ampproject.org/docs/fundamentals/spec)
It could be hard to convert any html into AMP perfectly but if it's `simple` one it's possible to convert automatically.

For example...

- Tech blog
- Corporate news blog

So this library's target is `To convert simple html into AMP`.

## Installation

```bash
$ npm install html2amp --save
```

## Usage

```nodejs
const html2amp = require('html2amp')
const html = `<your html>`
const options = {}
const amp = html2amp(html, options)

console.log(amp) // amp string
```

## Options

name | default value | note
------------ | ------------- | -------------
cwd|`.`|image / styles base path
gaConfigPath| |`amp-analytics` config json path for [google analytics](https://www.ampproject.org/docs/analytics/analytics-vendors)
serviceWorker| |attributes of [amp-install-serviceworker](https://www.ampproject.org/docs/reference/components/amp-install-serviceworker) <br/> e.g. `src`, `data-iframe-src`
optimize|false| if true, this module will optimize the html by using [@ampproject/toolbox-optimizer](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer)
cssPlugins | [] | you can add custom converter for css.
htmlPlugins | [] | you can add custom converter for css.

### CSS Plugin

CSS Plugin allow you to add custom converter for CSS.

```javascript
/**
 * elementString :
 *   e.g. '<style id="test">.test { color: red; }</style>'
 *   e.g. '<link rel="stylesheet" href="http://example.com/test.css"></style>'
 * cssText :
 *   e.g. '.test{ color: red; }'
 * options : module options
 **/
const plugin = (elementString, cssText, options) => {
  // you need to return cssText which you modified.
  return cssText.replace('red', '#ccc')
}

// options
const options = {
  cssPlugins: [ plugin ]
}
```

### HTMl Plugin

HTML Plugin allow you to add custom converter for HTML.

```javascript
/**
 * htmlString :
 *   e.g. '<html><body><h1>Normal HTML</h1></body></html>'
 * options : module options
 **/
const plugin = (htmlString, options) => {
  // you need to return htmlString which you modified.
  return htmlString.replace('Normal', 'AMP')
}

// options
const options = {
  htmlPlugins: [ plugin ]
}
```

## Functions

This library ...

- add `<meta charset="utf-8" />` if it does not exist
- add `amp` attribute to the `<html>`
- add `viewport` meta if it does not exist
  - viewport should be `<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">`
- replace all external css files with one `<style amp-custom>/* css is here */<style/>`
    - also removed `!imporant` keyword
- remove all scripts
- add [AMP CSS boilerplate](https://www.ampproject.org/docs/fundamentals/converting/resolving-errors#include-amp-css-boilerplate)
- replace `<img />`, `<picture><source /></picture>` with `<amp-img />`
  - also add width height attributes if it do not exist
  - also add `layout="responsive"` attribute
- replace `<iframe />` with `<amp-iframe />`
- add `<amp-analytics />`
  - supports different types of vendors (https://www.ampproject.org/docs/analytics/analytics-vendors)
  - also removed regular google analytics tag
  - it's optional
- add [amp-install-serviceworker](https://www.ampproject.org/docs/reference/components/amp-install-serviceworker)
  - it's optional
- replace all a tag links which destination is original site with absolute url which starts with http[s]
  - original url comes from canonical's href attribute
  - e.g. `<a href="/test">` is replaced with `<a href="https//original-url.com/test">`
  - NOTE: If the canonical url in your html is not absolute url this function would be passed
- remove all `<link ref="preload" type="script">`, `<link ref="preload" type="fetch">`
- optimize html by using [@ampproject/toolbox-optimizer](https://github.com/ampproject/amp-toolbox/tree/master/packages/optimizer)

## Preparation

To make your html valid AMP your html also should ...

- have canonical meta tag to regular HTML
- Don't have any problem if all scripts are removed
- Don't have any problem if all `!imporant` syntax are removed in css
