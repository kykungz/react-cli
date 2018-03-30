const { COMPONENT_TYPE, CSS_TYPE, PROP_TYPES } = require('./constants')

module.exports = {
  [CSS_TYPE]: {
    type: 'list',
    name: CSS_TYPE,
    message: 'Choose how you style your components:',
    choices: ['Inline styling (None)', 'CSS Modules', 'Styled-components']
  },
  [COMPONENT_TYPE]: {
    type: 'list',
    name: COMPONENT_TYPE,
    message: 'Choose component type:',
    choices: ['Stateful (-s)', 'Functional / Stateless (-f)', 'Pure Component (-p)']
  },
  [PROP_TYPES]: {
    type: 'confirm',
    name: PROP_TYPES,
    message: 'Add propTypes validation?',
    default: false
  }
}
