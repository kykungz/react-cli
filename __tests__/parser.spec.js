/* eslint-disable no-undef */

const parser = require('../src/parser')

describe('parser', () => {
  describe('concat', () => {
    test('should return merged template', () => {
      const base = {
        import: 'import a',
        suffix: 'suffix a'
      }
      const template = {
        import: 'import b',
        prefix: 'prefix b'
      }
      const expected = {
        import: 'import a\nimport b',
        prefix: 'prefix b',
        body: '',
        suffix: 'suffix a',
        export: ''
      }
      expect(parser.concat(base, template)).toEqual(expected)
    })
  })

  describe('toString ', () => {
    test('should return string according to template', () => {
      const template = {
        import: 'import a\nimport b',
        prefix: 'prefix a',
        body: '',
        suffix: 'suffix a\nsuffix b',
        export: 'export a'
      }
      const expected =
        'import a\n' +
        'import b\n\n' +
        'prefix a\n\n' +
        'suffix a\n' +
        'suffix b\n\n' +
        'export a\n'
      expect(parser.toString(template)).toEqual(expected)
    })
  })
})
