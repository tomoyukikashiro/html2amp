const iframe = ($, options) => {
  $('iframe').each((i, element) => {
    const $iframe = $(element)
    const $amp = $('<amp-iframe />')
    $amp.attr(element.attribs)
    $iframe.replaceWith($amp)
  })
  if ($('amp-iframe').length) {
    $('script[custom-element="amp-iframe"]').remove()
    $('head').prepend('<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>')
  }
  return $
}

module.exports = iframe
