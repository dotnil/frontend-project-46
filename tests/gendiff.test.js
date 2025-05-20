import { describe, test, expect } from '@jest/globals'
import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../src/gen-diff.js'
import expectedStylish from '../__fixtures__/expected-stylish.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

describe('genDiff', () => {
  test('should return correct diff in stylish format', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')

    const result = genDiff(file1, file2, 'stylish')

    expect(result).toBe(expectedStylish)
  })
})
