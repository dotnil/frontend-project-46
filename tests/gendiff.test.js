import { describe, test, expect } from '@jest/globals'
import path from 'path'
import { fileURLToPath } from 'url'
import { genState } from '../src/gen-diff.js'
import readFile from '../src/parsers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('genDiff', () => {
  test('should output correct diff for given file paths', () => {
    const filepath1 = path.join(__dirname, '../__fixtures__/file1-short.json')
    const filepath2 = path.join(__dirname, '../__fixtures__/file2-short.json')

    const object1 = readFile(filepath1)
    const object2 = readFile(filepath2)

    const expected = [
      {
        group1: {
          operation: '=',
          value: [
            {
              baz: {
                operation: '-',
                value: 'bas',
              },
            },
            {
              baz: {
                operation: '+',
                value: 'bars',
              },
            },
            {
              foo: {
                operation: '=',
                value: 'bar',
              },
            },
            {
              nest: {
                operation: '-',
                value: {
                  key: 'value',
                },
              },
            },
            {
              nest: {
                operation: '+',
                value: 'str',
              },
            },
          ],
        },
      },
    ]

    expect(genState(object1, object2)).toEqual(expected)
  })
})
