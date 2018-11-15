const script = ($) => {
  $('script:not([type="application/ld+json"])').remove()
  return $
}

module.exports = script
