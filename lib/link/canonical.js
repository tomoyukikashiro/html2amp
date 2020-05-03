const URL = require('url').URL

const replaceOriginal = ($, elems, url) => {
  elems.each((index, org) => {
    const $org = $(org)
    if ($org.attr('href').startsWith('http')) return
    if ($org.attr('href').startsWith('//')) return
    if (!url.startsWith('http')) {
      return
    }
    const clone = $org.clone()
    clone.attr('href', new URL(clone.attr('href'), url).href)
    $org.replaceWith(clone)
  })
}

const canonical = ($) => {
  const canonicalUrl = $('link[rel=canonical]').attr('href')
  if (!canonicalUrl) return $
  replaceOriginal($, $('a[href]'), canonicalUrl)
  return $
}

module.exports = canonical
