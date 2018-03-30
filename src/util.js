const parser = require('./parser')

module.exports.compose = (...fns) => (options) => (
  fns.reduce((template, fn) => parser.concat(template, fn(options)), {})
)
