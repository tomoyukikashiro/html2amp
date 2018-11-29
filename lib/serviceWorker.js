const serviceWorker = ($, options = {}) => {
  if (!options.serviceWorker) return $
  $('script[custom-element="amp-install-serviceworker"]').remove()
  $('head').prepend('<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>')
  const $swInstaller = $('<amp-install-serviceworker />')
  $swInstaller.attr(options.serviceWorker)
  $('body').prepend($swInstaller)
  return $
}

module.exports = serviceWorker
