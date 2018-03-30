const { COMPONENT_TYPE, CSS_TYPE, PROP_TYPES } = require('./constants')
const PromptBase = require('inquirer/lib/prompts/base')
const inquirer = require('inquirer')
const prompts = require('./questions')
const chalk = require('chalk')

module.exports.prompt = (flags) => {
  prompts[COMPONENT_TYPE].when = () => {
    const { stateful, functional, pure } = flags

    if (stateful || functional || pure) {
      const question = new PromptBase(prompts[COMPONENT_TYPE]).getQuestion()
      if (stateful) {
        console.log(question + chalk.cyan('Stateful (-s)'))
      } else if (functional) {
        console.log(question + chalk.cyan('Stateless / Functional (-f)'))
      } else if (pure) {
        console.log(question + chalk.cyan('Pure Component (-p)'))
      }
      return false
    }
    return true
  }

  prompts[PROP_TYPES].when = () => {
    const { propTypes } = flags

    if (propTypes) {
      const question = new PromptBase(prompts[CSS_TYPE]).getQuestion()
      console.log(question + chalk.cyan('Yes'))
      return false
    }
    return true
  }

  return inquirer.prompt(Object.values(prompts))
}
