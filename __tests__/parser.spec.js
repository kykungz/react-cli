/* eslint-disable no-undef */

const parser = require('../src/parser')

describe('parser', () => {
  describe('.concat ', () => {
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
})
