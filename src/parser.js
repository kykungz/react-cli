/**
 * Validate and fix object to have neccessary attributes
 * (import, prefix, body, suffix, export).
 * @param  {object} template - Object to be fixed
 * @return {object} Fixed object.
 */
const fix = (template) => {
  return {
    import: template.import || '',
    prefix: template.prefix || '',
    body: template.body || '',
    suffix: template.suffix || '',
    export: template.export || ''
  }
}

/**
 * Concatenate / Merge templates.
 * @param  {object} base - Base template.
 * @param  {object} template - Template to be merged with.
 * @return {object} Merged template.
 */
module.exports.concat = (base, template) => {
  base = fix(base)
  template = fix(template)
  return Object.keys(template)
    .map(key => ({
      [key]: (base[key] + ('\n' + template[key])).trim()
    }))
    .reduce((acc, cur) => ({...acc, ...cur}), {})
}

/**
 * Convert template to String
 * @param  {object} template - Template to be converted
 * @return {string} Template in a String form
 */
module.exports.toString = (template) => {
  template = fix(template)
  return Object.entries(template)
    .filter(entry => entry[1] !== '') // remove empty sections
    .map(entry => entry[1]) // flatten array (only contains values)
    .join('\n\n') // blank space
    .concat('\n') // ending newline
}
