const isComplexValue = value => typeof value === 'object' && value !== null

const formatPropertyValue = (value) => {
  if (isComplexValue(value)) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const buildPropertyPath = (path, key) => (path ? `${path}.${key}` : key)

const formatters = {
  added: (fullPath, { value }) =>
    `Property '${fullPath}' was added with value: ${formatPropertyValue(value)}`,

  removed: fullPath =>
    `Property '${fullPath}' was removed`,

  updated: (fullPath, { value, prevValue }) =>
    `Property '${fullPath}' was updated. From ${formatPropertyValue(prevValue)} to ${formatPropertyValue(value)}`,

  nested: (fullPath, { value }, plainFn) =>
    plainFn(value, fullPath),

  unchanged: () => [],
}

function plain(diff, parentPath = '') {
  return diff
    .flatMap((item) => {
      const [key, meta] = Object.entries(item)[0]
      const fullPath = buildPropertyPath(parentPath, key)

      const handler = formatters[meta.operation]
      if (!handler) return []

      if (meta.operation === 'nested') {
        return handler(fullPath, meta, plain)
      }

      return handler(fullPath, meta)
    })
    .join('\n')
}

export default plain
