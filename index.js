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

`)

const command = cli.input[0]

reactCli[command] ? reactCli[command]() : cli.showHelp()
