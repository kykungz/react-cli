/* eslint-disable no-undef */

const reactCli = require('../src/react-cli')

describe.skip('create', () => {
  describe('class component', () => {
    test('should return correct template', () => {
      const flags = {
        class: true
      }
      const result = reactCli.create('MyComponent', flags)
      expect(result).toMatchSnapshot()
    })
    describe('with prop-types', () => {
      test('should return correct template', () => {
        const flags = {
          class: true,
          'prop-types': true
        }
        const result = reactCli.create('MyComponent', flags)
        expect(result).toMatchSnapshot()
      })
    })
  })

  describe('functional component', () => {
    test('should return correct template', () => {
      const flags = {
        functional: true
      }
      const result = reactCli.create('MyFunctionalComponent', flags)
      expect(result).toMatchSnapshot()
    })
  })

  describe('pure component', () => {
    test('should return correct template', () => {
      const flags = {
        pure: true
      }
      const result = reactCli.create('MyPureComponent', flags)
      expect(result).toMatchSnapshot()
    })
  })
})
