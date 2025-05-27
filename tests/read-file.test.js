import { describe, test, expect } from '@jest/globals'
import path from 'path'
import { fileURLToPath } from 'url'
import readFile from '../src/read-file.js'
import expected from '../__fixtures__/expected-parsers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('readFile', () => {
  test('should correctly read and parse JSON file', () => {
    const filepath = path.join(__dirname, '../__fixtures__/file1.json')
    expect(readFile(filepath)).toEqual(expected)
  })

  test('should parse YAML files with .yml and .yaml extensions', () => {
    const ymlPath = path.join(__dirname, '../__fixtures__/file1.yml')
    const yamlPath = path.join(__dirname, '../__fixtures__/file1.yaml')
    expect(readFile(ymlPath)).toEqual(expected)
    expect(readFile(yamlPath)).toEqual(expected)
  })

  test('should throw error for unsupported file format', () => {
    const filepath = path.join(__dirname, '../__fixtures__/error-file1.txt')
    expect(() => readFile(filepath)).toThrow('Unsupported format: txt')
  })

  test('should throw error when file not found', () => {
    const missingPath = path.join(__dirname, '../__fixtures__/missing.json')
    expect(() => readFile(missingPath)).toThrow(/ENOENT/)
  })
})
