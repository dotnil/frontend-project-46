import formatDiff from './formatters/index.js';
import readFile from './parsers.js';

const getAllKeysSorted = (object1, object2) => {
  const uniqueKeys = new Set([...Object.keys(object1), ...Object.keys(object2)]);
  return [...uniqueKeys].toSorted();
};

const areValuesEqual = (oldValue, newValue) => oldValue === newValue;
const isKeyRemoved = (newValue) => newValue === undefined;
const isKeyAdded = (oldValue) => oldValue === undefined;

const createDiffEntry = (key, operation, value) => ({ [key]: { operation, value } });

const genState = (object1, object2) => {
  const sortedKeys = getAllKeysSorted(object1, object2);

  return sortedKeys.reduce((acc, key) => {
    const oldValue = object1[key];
    const newValue = object2[key];

    let result;

    if (typeof oldValue === 'object' && oldValue !== null
      && typeof newValue === 'object' && newValue !== null) {
      const diff = genState(oldValue, newValue);
      result = [...acc, createDiffEntry(key, '=', diff)];
    } else if (areValuesEqual(oldValue, newValue)) {
      result = [...acc, createDiffEntry(key, '=', oldValue)];
    } else if (isKeyRemoved(newValue)) {
      result = [...acc, createDiffEntry(key, '-', oldValue)];
    } else if (isKeyAdded(oldValue)) {
      result = [...acc, createDiffEntry(key, '+', newValue)];
    } else {
      result = [
        ...acc,
        createDiffEntry(key, '-', oldValue),
        createDiffEntry(key, '+', newValue),
      ];
    }

    return result;
  }, []);
};

const genDiff = (filepath1, filepath2, format) => {
  const object1 = readFile(filepath1);
  const object2 = readFile(filepath2);

  const diff = genState(object1, object2);

  return formatDiff(diff, format);
};

export default genDiff;
export { genState };
