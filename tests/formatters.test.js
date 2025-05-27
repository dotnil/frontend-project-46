import path from 'path'
import { fileURLToPath } from 'url'
import { describe, test, expect } from '@jest/globals'
import readFile from '../src/read-file.js'
import { genState } from '../src/gen-diff.js'
import stylish from '../src/formatters/stylish.js'
import plain from '../src/formatters/plain.js'
import json from '../src/formatters/json.js'
import expectedStylish from '../__fixtures__/expected-stylish.js'
import expectedPlain from '../__fixtures__/expected-plain.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const filepath1 = getFixturePath('file1.json')
const filepath2 = getFixturePath('file2.json')

const obj1 = readFile(filepath1)
const obj2 = readFile(filepath2)
const diff = genState(obj1, obj2)

const formatters = [
  ['stylish', stylish, expectedStylish],
  ['plain', plain, expectedPlain],
  ['json', json, JSON.stringify(diff)],
]

describe('formatters', () => {
  test.each(formatters)(
    'should correctly format diff using %s formatter',
    (name, formatter, expected) => {
      const result = formatter(diff)

      if (name === 'json') {
        expect(() => JSON.parse(result)).not.toThrow()
        expect(JSON.parse(result)).toEqual(diff)
      }

      expect(result).toBe(expected)
    },
  )
})
