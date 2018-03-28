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
  const concat = Object.keys(template)
    .map(key => ({[key]: base[key] + (template[key] && ('\n' + template[key]))}))
    .reduce((acc, cur) => ({...acc, ...cur}), {})
  return concat
}

module.exports.toString = (template) => {
  template = fix(template)
  return `${template.import}\n${template.prefix}\n${template.body}\n${template.suffix}\n${template.export}\n`
}
