import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const formatDiff = (diff, format = 'stylish') => {
  const formatter = formatters[format] || stylish;
  return formatter(diff);
};

export default formatDiff;
