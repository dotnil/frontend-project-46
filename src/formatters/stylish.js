const indent = level => '  '.repeat(level)
const isObject = value => typeof value === 'object' && value !== null

const display = (value, level = 0) => {
  if (!isObject(value)) return value

  const entries = Object.entries(value)
    .map(([key, val]) => `${indent(level + 2)}${key}: ${isObject(val) ? display(val, level + 2) : val}`)
    .join('\n')

  return `{\n${entries}\n${indent(level)}}`
}

function stylish(diff, level = 0) {
  return `{\n${diff.map(item => {
    const [key, value] = Object.entries(item)[0]
    const { operation, value: val } = value
    const indentedKey = `${indent(level + 1)}${operation !== '=' ? `${operation} ` : '  '}${key}:`

    if (operation === '=') {
      return Array.isArray(val)
        ? `${indentedKey} ${stylish(val, level + 2)}`
        : `${indentedKey} ${display(val, level)}`
    }

    return `${indentedKey} ${display(val, level + 2)}`
  }).join('\n')}\n${indent(level)}}`
}

export default stylish
