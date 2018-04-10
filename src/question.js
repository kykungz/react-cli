const { autoComplete } = require('./util')

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

/* Recieve flags to determine which questions should be asked */
module.exports = (flags) => {
  const generate = autoComplete(flags)
  return [
    generate(
      {
        type: 'list',
        name: CSS_TYPE,
        message: 'Choose how you style your components:',
        choices: [INLINE_STYLE, CSS_MODULE, STYLED_COMPONENTS]
      },
      [{ inline: true }, { cssModule: true }, { styledComponents: true }]
    ),
    generate(
      {
        type: 'list',
        name: COMPONENT_TYPE,
        message: 'Choose component type:',
        choices: [STATEFUL, FUNCTIONAL, PURE]
      },
      [{ stateful: true }, { functional: true }, { pure: true }]
    ),
    {
      type: 'confirm',
      name: PROP_TYPES,
      message: 'Add propTypes validation?',
      default: false
    }
  ]
}
