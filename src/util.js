const path = require('path')
const parser = require('./parser')

module.exports.compose = (...fns) => (args) => (
  fns.reduce((template, fn) => parser.concat(template, fn(args)), {})
)

module.exports.isFile = (filepath) => path.extname(filepath) !== ''
