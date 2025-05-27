import formatDiff from './formatters/index.js'
import readFile from './read-file.js'

const getAllKeysSorted = (obj1, obj2) => {
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
  return [...allKeys].toSorted()
}

const createDiffEntry = (key, operation, value, prevValue = undefined) => {
  const entry = { [key]: { operation, value } }
  if (prevValue !== undefined) {
    entry[key].prevValue = prevValue
  }
  return entry
}

const isPlainObject = val =>
  typeof val === 'object' && val !== null && !Array.isArray(val)

const genState = (obj1, obj2) => {
  const keys = getAllKeysSorted(obj1, obj2)

  return keys.map((key) => {
    const oldValue = obj1[key]
    const newValue = obj2[key]

    const isOldObj = isPlainObject(oldValue)
    const isNewObj = isPlainObject(newValue)

    if (isOldObj && isNewObj) {
      return createDiffEntry(key, 'nested', genState(oldValue, newValue))
    }

    if (!(key in obj2)) {
      return createDiffEntry(key, 'removed', oldValue)
    }

    if (!(key in obj1)) {
      return createDiffEntry(key, 'added', newValue)
    }

    if (oldValue !== newValue) {
      return createDiffEntry(key, 'updated', newValue, oldValue)
    }

    return createDiffEntry(key, 'unchanged', oldValue)
  })
}

const genDiff = (filepath1, filepath2, format) => {
  const object1 = readFile(filepath1)
  const object2 = readFile(filepath2)

  const diff = genState(object1, object2)

  return formatDiff(diff, format)
}

export default genDiff
export { genState }
