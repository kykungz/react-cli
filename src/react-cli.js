const mkdirp = require('mkdirp')
const fs = require('fs')
const path = require('path')
const coffee = require('coffee-script')
const parser = require('./parser')
const { compose, isFile } = require('./util')
const {
  COMPONENT_NAME,
  CSS_MODULE,
  STYLED_COMPONENTS,
  FUNCTIONAL,
  PURE
} = require('./constants')

class ReactCli {
  create (filepath, options) {
    const apply = compose(
      this._withComponentType,
      this._withPropType,
      this._withStyleType
    )
    const template = apply({ options, filepath })
    const content = parser
      .toString(template)
      .replace(new RegExp(COMPONENT_NAME, 'g'), path.parse(filepath).name)

    try {
      if (isFile(filepath)) {
        mkdirp.sync(path.join(process.cwd(), path.dirname(filepath)))
        fs.writeFileSync(path.join(process.cwd(), filepath), content)
      } else {
        mkdirp.sync(path.join(process.cwd(), filepath))
        fs.writeFileSync(path.join(process.cwd(), filepath, 'index.js'), content)
      }
    } catch (err) {
      throw err
    }
    return content
  }

  _withComponentType ({ options }) {
    let filename
    if (options[FUNCTIONAL]) {
      filename = 'functional.cson'
    } else if (options[PURE]) {
      filename = 'pure.cson'
    } else {
      filename = 'class.cson'
    }
    const cson = fs.readFileSync(path.join(__dirname, `/templates/${filename}`)).toString()
    return coffee.eval(cson)
  }

  _withPropType ({ options }) {
    if (options.propTypes) {
      const cson = fs.readFileSync(path.join(__dirname, `/templates/prop-types.cson`)).toString()
      return coffee.eval(cson)
    }
    return {}
  }

  _withStyleType ({ options, filepath }) {
    let cson
    switch (options.cssType) {
      case CSS_MODULE:
        if (isFile(filepath)) {
          const css = path.format({
            ...path.parse(filepath),
            ext: '.css',
            base: undefined
          })
          fs.writeFileSync(path.join(process.cwd(), css), '')
        } else {
          fs.writeFileSync(path.join(process.cwd(), filepath, 'style.css'), '')
        }
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
