// const Conf = require('conf')
// const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const coffee = require('coffee-script')
const parser = require('./parser')

// const config = new Conf()

class ReactCli {
  create (name, flags) {
    let filename, cson, template

    if (flags.functional) {
      filename = 'functional.cson'
    } else if (flags.pure) {
      filename = 'pure.cson'
    } else {
      filename = 'class.cson'
    }

    cson = fs.readFileSync(path.join(__dirname, `/templates/${filename}`)).toString()
    template = coffee.eval(cson)

    if (flags['prop-types']) {
      cson = fs.readFileSync(path.join(__dirname, `/templates/prop-types.cson`)).toString()
      template = parser.concat(template, coffee.eval(cson))
    }

    return parser.toString(template).replace(new RegExp('%{COMPONENT_NAME}%', 'g'), name)
  }
}

module.exports = new ReactCli()
