const viewport = ($) => {
  $('meta[name="viewport"]').remove()
  $('head').append('<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">')
  return $
}

module.exports = viewport
