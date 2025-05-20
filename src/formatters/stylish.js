const indent = level => '  '.repeat(level)
const isObject = value => typeof value === 'object' && value !== null

const display = (value, level = 0) => {
  if (!isObject(value)) return String(value)

  const entries = Object.entries(value)
    .map(([key, val]) =>
      `${indent(level + 2)}${key}: ${isObject(val) ? display(val, level + 2) : String(val)}`)
    .join('\n')

  return `{\n${entries}\n${indent(level)}}`
}

function stylish(diff, level = 0) {
  const lines = diff.flatMap((item) => {
    const [key, meta] = Object.entries(item)[0]
    const { operation, value, prevValue } = meta

    const baseIndent = indent(level + 1)

    switch (operation) {
      case 'nested':
        return `${baseIndent}  ${key}: ${stylish(value, level + 2)}`
      case 'added':
        return `${baseIndent}+ ${key}: ${display(value, level + 2)}`
      case 'removed':
        return `${baseIndent}- ${key}: ${display(value, level + 2)}`
      case 'updated':
        return [
          `${baseIndent}- ${key}: ${display(prevValue, level + 2)}`,
          `${baseIndent}+ ${key}: ${display(value, level + 2)}`,
        ]
      case 'unchanged':
      default:
        return `${baseIndent}  ${key}: ${display(value, level + 2)}`
    }
  })

  return `{\n${lines.join('\n')}\n${indent(level)}}`
}

export default stylish
