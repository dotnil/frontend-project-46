const isComplexValue = value => typeof value === 'object' && value !== null

const formatPropertyValue = (value) => {
  if (isComplexValue(value)) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const buildPropertyPath = (path, key) => (path ? `${path}.${key}` : key)

function plain(diff, parentPath = '') {
  return diff
    .flatMap((item) => {
      const [key, { operation, value, prevValue }] = Object.entries(item)[0]
      const fullPath = buildPropertyPath(parentPath, key)

      switch (operation) {
        case 'added':
          return `Property '${fullPath}' was added with value: ${formatPropertyValue(value)}`
        case 'removed':
          return `Property '${fullPath}' was removed`
        case 'updated':
          return `Property '${fullPath}' was updated. From ${formatPropertyValue(prevValue)} to ${formatPropertyValue(value)}`
        case 'nested':
          return plain(value, fullPath)
        case 'unchanged':
        default:
          return []
      }
    })
    .join('\n')
}

export default plain
