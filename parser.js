import fs from 'fs';
import yaml from 'js-yaml';

const determineFormat = (filepath) => {
  const fileParts = filepath.split('.');
  return fileParts[fileParts.length - 1];
};

const readFile = (filepath) => {
  const format = determineFormat(filepath);
  const content = fs.readFileSync(filepath, 'utf8');
  console.log(format);

  if (format === 'json') return JSON.parse(content);
  if (format === 'yml') return yaml.load(content);
  throw new Error('Unsupported file format or invalid data');
};

export default readFile;
