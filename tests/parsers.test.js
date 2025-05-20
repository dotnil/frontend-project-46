import { describe, test, expect } from '@jest/globals'
import path from 'path'
import { fileURLToPath } from 'url'
import readFile from '../src/parsers.js'
import expected from '../__fixtures__/expected-parsers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('gendiff CLI with real files', () => {
  test('parsers — should parse supported formats correctly', () => {
    const filepath = path.join(__dirname, '../__fixtures__/file1.json')
    expect(readFile(filepath)).toStrictEqual(expected)
  })
})
