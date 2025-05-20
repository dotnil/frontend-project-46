import { describe, test, expect } from '@jest/globals'
import path from 'path'
import { fileURLToPath } from 'url'
import plain from '../src/formatters/plain.js'
import { genState } from '../src/gen-diff.js'
import readFile from '../src/parsers.js'
import expected from '../__fixtures__/expected-plain.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('plain', () => {
  test('should format diff output in plain format', () => {
    const filepath1 = path.join(__dirname, '../__fixtures__/file1.json')
    const filepath2 = path.join(__dirname, '../__fixtures__/file2.json')

    const object1 = readFile(filepath1)
    const object2 = readFile(filepath2)

    const diff = genState(object1, object2)

    expect(plain(diff)).toBe(expected)
  })
})
