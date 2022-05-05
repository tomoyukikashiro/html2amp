const amphtml = ($) => {
  $('link[rel="amphtml"]').remove()
  return $
}

module.exports = amphtml
