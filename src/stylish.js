const indent = (level) => '..'.repeat(level);

const display = (value, level) => {
  if (typeof value === 'object' && value !== null) {
    const temp = Object.entries(value).map(([key, val]) => {
      if (typeof val === 'object' && val !== null) return `${indent(level + 2)}${key}: ${display(val, level + 2)}`;
      return `${indent(level + 2)}${key}: ${val}`;
    }).join('\n');
    return `{\n${temp}\n${indent(level)}}`;
  }
  return value;
};

function displayDiff(diff, level = 0) {
  const lines = diff.map((item) => {
    const [key, value] = Object.entries(item)[0];

    if (value.operation === '-') {
      return `${indent(level + 1)}${value.operation} ${key}: ${display(value.value, level + 2)}`;
    }
    if (value.operation === '=') {
      if (Array.isArray(value.value)) {
        return `${indent(level + 1)}  ${key}: ${displayDiff(value.value, level + 2)}`;
      }
      return `${indent(level + 1)}  ${key}: ${display(value.value, level)}`;
    }
    if (value.operation === '+') {
      return `${indent(level + 1)}${value.operation} ${key}: ${display(value.value, level + 2)}`;
    }

    return `${indent(level + 1)}${value.operation} ${key}: ${display(value.value, level)}\n${indent(level + 1)}${value.operation} ${key}: ${display(value.value, level)}`;
  });

  return `{\n${lines.join('\n')}\n${indent(level)}}`;
}

export default displayDiff;
