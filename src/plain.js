const isObject = (value) => typeof value === 'object' && value !== null;

const formatValue = (value) => {
  if (isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const getPropertyPath = (path, key) => (path ? `${path}.${key}` : key);

const getOperationMessage = (propertyPath, operation, value, prevValue) => {
  switch (operation) {
    case 'updated':
      return `Property '${propertyPath}' was updated. From ${formatValue(prevValue)} to ${formatValue(value)}`;
    case 'added':
      return `Property '${propertyPath}' was added with value: ${formatValue(value)}`;
    case 'removed':
      return `Property '${propertyPath}' was removed`;
    default:
      return null;
  }
};

function plain(diff, path = '') {
  return diff.flatMap((item, index) => {
    const [key, { operation, value }] = Object.entries(item)[0];
    const propertyPath = getPropertyPath(path, key);
    const prevOperation = diff[index - 1]?.[key]?.operation;
    const nextOperation = diff[index + 1]?.[key]?.operation;

    let message = null;

    if (operation === '+' && prevOperation === '-') {
      message = getOperationMessage(propertyPath, 'updated', value, diff[index - 1][key].value);
    } else if (operation === '+' && prevOperation !== '-') {
      message = getOperationMessage(propertyPath, 'added', value);
    } else if (operation === '-' && nextOperation !== '+') {
      message = getOperationMessage(propertyPath, 'removed');
    } else if (operation === '=' && Array.isArray(value)) {
      message = plain(value, propertyPath);
    }

    return message;
  })
    .filter(Boolean)
    .join('\n');
}

export default plain;
