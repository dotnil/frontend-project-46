import path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import yaml from 'js-yaml'

import { genState } from '../src/gen-diff.js'
import json from '../src/formatters/json.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const parse = (filepath) => {
  const content = readFileSync(filepath, 'utf-8')
  const ext = path.extname(filepath)
  if (ext === '.json') return JSON.parse(content)
  if (ext === '.yml' || ext === '.yaml') return yaml.load(content)
  throw new Error('Unsupported format')
}

describe('json formatter', () => {
  test('formats diff as valid JSON string', () => {
    const filepath1 = path.join(__dirname, '../__fixtures__/file1.json')
    const filepath2 = path.join(__dirname, '../__fixtures__/file2.json')

    const object1 = parse(filepath1)
    const object2 = parse(filepath2)

    const diff = genState(object1, object2)
    const output = json(diff)

    expect(() => JSON.parse(output)).not.toThrow()

    expect(output).toBe(JSON.stringify(diff))
  })
})
