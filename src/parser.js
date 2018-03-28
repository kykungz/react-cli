module.exports.parse = (name, template) => {
  return `${template.import}\n${template.prefix}\n${template.body}\n${template.suffix}\n${template.export}`
    .replace(new RegExp('%{COMPONENT_NAME}%', 'g'), name)
}
