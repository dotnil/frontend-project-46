import fs from 'fs'
import parse from './parsers.js'
import path from 'path'

const getFormat = (filepath) => {
  const ext = path.extname(filepath)
  return ext.slice(1).toLowerCase()
}

const readFile = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8')
  const format = getFormat(filepath)
  return parse(content, format)
}

export default readFile
