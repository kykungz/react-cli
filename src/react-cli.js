// const Conf = require('conf')
const { COMPONENT_NAME, CSS_MODULE, STYLED_COMPONENTS } = require('./constants')
const fs = require('fs')
const path = require('path')
const coffee = require('coffee-script')
const parser = require('./parser')
const { compose } = require('./util')
// const config = new Conf()

class ReactCli {
  init () {}

  create (name, options) {
    console.log(options)
    const apply = compose(
      this._withComponentType,
      this._withPropType,
      this._withStyleType
    )
    const template = apply(options)
    return parser.toString(template).replace(new RegExp(COMPONENT_NAME, 'g'), name)
  }

  _withComponentType (options) {
    let filename
    if (options.functional) {
      filename = 'functional.cson'
    } else if (options.pure) {
      filename = 'pure.cson'
    } else {
      filename = 'class.cson'
    }
    const cson = fs.readFileSync(path.join(__dirname, `/templates/${filename}`)).toString()
    return coffee.eval(cson)
  }

  _withPropType (options) {
    if (options.propTypes) {
      const cson = fs.readFileSync(path.join(__dirname, `/templates/prop-types.cson`)).toString()
      return coffee.eval(cson)
    }
    return {}
  }

  _withStyleType (options) {
    let cson
    switch (options.cssType) {
      case CSS_MODULE:
        cson = fs.readFileSync(path.join(__dirname, `/templates/css-module.cson`)).toString()
        return coffee.eval(cson)
      case STYLED_COMPONENTS:
        cson = fs.readFileSync(path.join(__dirname, `/templates/styled-components.cson`)).toString()
        return coffee.eval(cson)
      default:
        return {}
    }
  }
}

module.exports = new ReactCli()
