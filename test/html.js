const htmlFactory = ({ head = '', body = '' } = {}) => {
  return `<html><head>${head}</head><body>${body}</body></html>`
}

module.exports = htmlFactory
