import { describe, test, expect } from '@jest/globals'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import parse from '../src/parsers.js'
import expected from '../__fixtures__/expected-parsers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('parse', () => {
  const jsonString = fs.readFileSync(
    path.join(__dirname, '../__fixtures__/file1.json'),
    'utf-8',
  )
  const yamlString = fs.readFileSync(
    path.join(__dirname, '../__fixtures__/file1.yml'),
    'utf-8',
  )

  test('should correctly parse JSON string', () => {
    const result = parse(jsonString, 'json')
    expect(result).toEqual(expected)
  })

  test('should parse data with "yaml" format', () => {
    const result = parse(yamlString, 'yaml')
    expect(result).toEqual(expected)
  })

  test('should parse data with "yml" format', () => {
    const result = parse(yamlString, 'yml')
    expect(result).toEqual(expected)
  })

  test('should throw error for unsupported format', () => {
    expect(() => parse('data', 'csv')).toThrow('Unsupported format: csv')
    expect(() => parse('data', '')).toThrow('Unsupported format: ')
  })
})
