const isComplexValue = (value) => typeof value === 'object' && value !== null;

const formatPropertyValue = (value) => {
  if (isComplexValue(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const buildPropertyPath = (path, key) => (path ? `${path}.${key}` : key);

const generateChangeMessage = (fullPath, operation, value, prevValue) => {
  const operations = {
    updated: () => `Property '${fullPath}' was updated. From ${formatPropertyValue(prevValue)} to ${formatPropertyValue(value)}`,
    added: () => `Property '${fullPath}' was added with value: ${formatPropertyValue(value)}`,
    removed: () => `Property '${fullPath}' was removed`,
  };

  return operations[operation]?.() || null;
};

function plain(diff, path = '') {
  return diff
    .flatMap((item, index, array) => {
      const [key, { operation, value }] = Object.entries(item)[0];
      const fullPath = buildPropertyPath(path, key);

      const previousOperation = array[index - 1]?.[key]?.operation;
      const followingOperation = array[index + 1]?.[key]?.operation;

      if (operation === '+' && previousOperation === '-') {
        return generateChangeMessage(fullPath, 'updated', value, array[index - 1][key].value);
      }

      if (operation === '+' && previousOperation !== '-') {
        return generateChangeMessage(fullPath, 'added', value);
      }

      if (operation === '-' && followingOperation !== '+') {
        return generateChangeMessage(fullPath, 'removed');
      }

      if (operation === '=' && Array.isArray(value)) {
        return plain(value, fullPath);
      }

      return [];
    })
    .join('\n');
}

export default plain;
