/* eslint-disable no-undef */
const { autoComplete } = require('../src/util')

describe('autoComplete', () => {
  test('should generate inquirer prompt', () => {
    const flags = {
      a: true,
      b: 10,
      c: 'hi'
    }
    const question = {
      type: 'list',
      name: 'This is a name',
      message: 'This is a message',
      choices: ['A', 'B', 'C', 'D']
    }
    const conditions = [null, { b: 10 }]

    const result = autoComplete(flags)(question, conditions)
    const expected = {
      type: 'list',
      name: 'This is a name',
      message: 'This is a message',
      choices: ['A', 'B', 'C', 'D'],
      when: false
    }
    expect(result).toEqual(expected)
  })
})
