const getAllKeysSorted = (object1, object2) => {
  const uniqueKeys = new Set([...Object.keys(object1), ...Object.keys(object2)]);
  return Array.from(uniqueKeys).sort();
};

const areValuesEqual = (oldValue, newValue) => oldValue === newValue;
const isKeyRemoved = (newValue) => newValue === undefined;
const isKeyAdded = (oldValue) => oldValue === undefined;

const createDiffEntry = (key, operation, value) => ({ [key]: { operation, value } });

const genDiff = (object1, object2) => {
  const sortedKeys = getAllKeysSorted(object1, object2);
  const diffEntries = [];

  sortedKeys.forEach((key) => {
    const oldValue = object1[key];
    const newValue = object2[key];

    if (typeof oldValue === 'object' && oldValue !== null && typeof newValue === 'object' && newValue !== null) {
      const diff = genDiff(oldValue, newValue);
      diffEntries.push(createDiffEntry(key, '=', diff));
    } else if (areValuesEqual(oldValue, newValue)) {
      diffEntries.push(createDiffEntry(key, '=', oldValue));
    } else if (isKeyRemoved(newValue)) {
      diffEntries.push(createDiffEntry(key, '-', oldValue));
    } else if (isKeyAdded(oldValue)) {
      diffEntries.push(createDiffEntry(key, '+', newValue));
    } else {
      diffEntries.push(createDiffEntry(key, '-', oldValue));
      diffEntries.push(createDiffEntry(key, '+', newValue));
    }
  });

  return diffEntries;
};

export default genDiff;
