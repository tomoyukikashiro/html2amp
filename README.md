
# html2amp

html2amp is `simple` converter from HTML into AMP(Accelerated Mobile Pages).

## Motivation

This library allow you to convert `simple` html into AMP. What does the `simple` means ?

As you know AMP has many restrictions to make it such as ...

- Some html tags are needed to be replaced by special one (`<amp-img />`, `<amp-iframe />`)
- CSS should be less than 50,000 bytes and it should be as inline

You can see full Specification here.
[AMP HTML Specification](https://www.ampproject.org/docs/fundamentals/spec)

It could be hard to convert any html into AMP but if it's `simple` one it's possible to convert automatically.

For example...

- Tech blog
- Corporate new blog

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

## Functions

This library ...

- add `<meta charset="utf-8" />` if it does not exist
- add `amp` attribute to the `<html>`
- add `viewport` meta if it does not exist
  - viewport should be `<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">`
- replace all external css files with one `<style amp-custom>/* css is here */<style/>`
- remove all scripts
- add [AMP CSS boilerplate](https://www.ampproject.org/docs/fundamentals/converting/resolving-errors#include-amp-css-boilerplate)
- replace `<img />` with `<amp-img />`
  - also add width height attributes if it do not exist
  - also add `layout="responsive"` attribute
- replace `<iframe />` with `<amp-iframe />`
- add `<amp-analytics />`
  - also removed regular google analytics tag
  - it's optional 
- removed `!imporant` keyword in css

## Preparation

To make your html valid AMP your html also should ...

- have canonical meta tag to regular HTML
- not have any problem if all scripts are removed
- not ahve any problem if all `!imporant` syntax are removed in css
