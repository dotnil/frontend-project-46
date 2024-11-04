const getSortedUniqueKeys = (object1, object2) => {
  const uniqueKeys = new Set([...Object.keys(object1), ...Object.keys(object2)]);

  return Array.from(uniqueKeys).sort();
};

const isNotChanged = (value1, value2) => value1 === value2;
const isDeleted = (value2) => value2 === undefined;
const isAdded = (value1) => value1 === undefined;

const formatKeyChange = (key, operation, value) => ({ [key]: { operation, value } });

const genDiff = (object1, object2) => {
  const keys = getSortedUniqueKeys(object1, object2);
  const result = [];

  keys.forEach((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (typeof value1 === 'object' && value1 !== null && typeof value2 === 'object' && value2 !== null) {
      const diff = genDiff(value1, value2);
      result.push(formatKeyChange(key, '=', diff));
    } else if (isNotChanged(value1, value2)) {
      result.push(formatKeyChange(key, '=', value1));
    } else if (isDeleted(value2)) {
      result.push(formatKeyChange(key, '-', value1));
    } else if (isAdded(value1)) {
      result.push(formatKeyChange(key, '+', value2));
    } else {
      result.push(formatKeyChange(key, '-', value1));
      result.push(formatKeyChange(key, '+', value2));
    }
  });

  return result;
};

export default genDiff;
