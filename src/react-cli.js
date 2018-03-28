// const Conf = require('conf')
// const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const coffee = require('coffee-script')
const parser = require('./parser')

// const config = new Conf()

class ReactCli {
  create (name, flags) {
    let template

    if (flags.functional) {
      template = 'functional.cson'
    } else if (flags.pure) {
      template = 'pure.cson'
    } else {
      template = 'class.cson'
    }

    const cson = fs.readFileSync(path.join(__dirname, '/templates/class.cson')).toString()
    template = coffee.eval(cson)

    if (flags['prop-types']) {}

    return parser.parse(name, template)
  }
}

module.exports = new ReactCli()
