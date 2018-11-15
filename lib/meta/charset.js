const charset = ($) => {
  $('meta[charset]').remove()
  $('head').append('<meta charset="utf-8" />')
  return $
}
module.exports = charset
