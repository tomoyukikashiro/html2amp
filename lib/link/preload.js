const preload = ($) => {
  $('link[rel="preload"][as="script"]').remove()
  $('link[rel="preload"][as="fetch"]').remove()
  return $
}

module.exports = preload
