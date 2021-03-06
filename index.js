#!/usr/bin/env node
'use strict'

const meow = require('meow')
const reactCli = require('./src/react-cli')
// const constants = require('./src/constants')
const question = require('./src/question')
const inquirer = require('inquirer')

const cli = meow(
  `
    Example Usage
      $ react-cli create [NAME] [FLAGS...]

    Flags
      -s, --stateful      Stateful Component
      -f, --functional    Functional / Stateless Component
      -p, --pure          Pure Component
      -t, --prop-types    Add propTypes validation
  `,
  {
    flags: {
      stateful: { type: 'boolean', alias: 's' },
      functional: { type: 'boolean', alias: 'f' },
      pure: { type: 'boolean', alias: 'p' },
      propTypes: { type: 'boolean', alias: 't' }
    }
  }
)

const command = cli.input[0]
const name = cli.input[1]

const commandList = {
  create: () => reactCli.create(cli.input[1], cli.flags)
}

if (commandList[command]) {
  try {
    inquirer.prompt(question(cli.flags)).then(answers => {
      console.log(reactCli.create(name, answers))
    })
  } catch (e) {
    console.log(e)
    cli.showHelp()
  }
} else {
  console.log('Command not found.')
  cli.showHelp()
}
