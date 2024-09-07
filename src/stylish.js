function formatDiff(diff) {
  const lines = diff.map((item) => {
    const [key, value] = Object.entries(item)[0];
    return `  ${value.operation} ${key}: ${value.value}`;
  });
  return `{\n${lines.join('\n')}\n}`;
}

export default formatDiff;
