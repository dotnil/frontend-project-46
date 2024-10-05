const display = (value) => {
  if (typeof value === 'object' && value !== null) {
    return `{\n${Object.entries(value).map(([key, val]) => `        ${key}: ${val}`).join(',\n')}\n    }`;
  }
  return value;
};

function displayDiff(diff) {
  const indent = (level) => '    '.repeat(level);
  const lines = diff.map((item) => {
    const [key, value] = Object.entries(item)[0];

    if (value.operation === '-') {
      return `  - ${key}: ${display(value.value)}`;
    }
    if (value.operation === '=') {
      if (Array.isArray(value.value)) {
        return `    ${key}: ${displayDiff(value.value)}`;
      }
      return `    ${key}: ${display(value.value)}`;
    }
    if (value.operation === '+') {
      return `  + ${key}: ${display(value.value)}`;
    }

    return `  - ${key}: ${display(value.value)}\n  + ${key}: ${display(value.value)}`;
  });

  return `{\n${lines.join('\n')}\n}`;
}

export default displayDiff;
