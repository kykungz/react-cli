const {
  COMPONENT_TYPE,
  CSS_TYPE,
  PROP_TYPES,
  STYLED_COMPONENTS,
  INLINE_STYLE,
  CSS_MODULE,
  STATEFUL,
  FUNCTIONAL,
  PURE
} = require('./constants')

module.exports = {
  [CSS_TYPE]: {
    type: 'list',
    name: CSS_TYPE,
    message: 'Choose how you style your components:',
    choices: [INLINE_STYLE, CSS_MODULE, STYLED_COMPONENTS]
  },
  [COMPONENT_TYPE]: {
    type: 'list',
    name: COMPONENT_TYPE,
    message: 'Choose component type:',
    choices: [STATEFUL, FUNCTIONAL, PURE]
  },
  [PROP_TYPES]: {
    type: 'confirm',
    name: PROP_TYPES,
    message: 'Add propTypes validation?',
    default: false
  }
}
