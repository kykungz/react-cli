#!/usr/bin/env node
'use strict'

const meow = require('meow')
const reactCli = require('./src/react-cli')

const cli = meow(`
  Example Usage
    $ react-cli create [NAME] [FLAGS...]

  Flags
    -f, --functional    Functional/Stateless Component
    -p, --pure          Pure Component
    -t, --prop-types    Add propTypes validation

    `,
  {
    boolean: ['functional', 'pure', 'prop-types'],
    alias: { f: 'functional', p: 'pure', t: 'prop-types' }
  })

const command = cli.input[0]

const commandList = {
  create: () => reactCli.create(cli.input[1], cli.flags)
}

if (commandList[command]) {
  try {
    console.log(commandList[command]())
  } catch (e) {
    cli.showHelp()
  }
} else {
  cli.showHelp()
}
