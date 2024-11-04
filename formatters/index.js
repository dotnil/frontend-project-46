import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish,
  plain,
};

const formatDiff = (diff, format = 'stylish') => {
  const formatter = formatters[format] || stylish;
  return formatter(diff);
};

export default formatDiff;
