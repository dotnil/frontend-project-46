import fs from 'fs'
import yaml from 'js-yaml'

const determineFormat = (filepath) => {
  const parts = filepath.split('.')
  return parts[parts.length - 1]
}

const parseContent = (content, format) => {
  if (format === 'json') return JSON.parse(content)
  if (format === 'yml' || format === 'yaml') return yaml.load(content)
  throw new Error('Unsupported file format or invalid data')
}

const readFile = (filepath) => {
  const format = determineFormat(filepath)
  const content = fs.readFileSync(filepath, 'utf8')
  return parseContent(content, format)
}

export default readFile
