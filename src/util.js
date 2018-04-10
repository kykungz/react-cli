const path = require('path')
const parser = require('./parser')
const chalk = require('chalk')
const PromptBase = require('inquirer/lib/prompts/base')

module.exports.compose = (...fns) => (args) => (
  fns.reduce((template, fn) => parser.concat(template, fn(args)), {})
)

module.exports.isFile = (filepath) => path.extname(filepath) !== ''

module.exports.autoComplete = (flags) => (question, conditions) => {
  const matched = conditions.some((item, index) => {
    if (item !== null) {
      const entry = Object.entries(item)[0]
      const key = entry[0]
      const value = entry[1]
      console.log(entry)
      if (flags[key] === value) {
        console.log(new PromptBase(question).getQuestion() + chalk.cyan(question.choices[index]))
        return true
      }
    }
  })
  return { ...question, when: !matched }
}
