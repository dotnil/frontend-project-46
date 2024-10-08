import { program } from 'commander';
import readFile from './parser.js';

const getSortedUniqueKeys = (object1, object2) => {
  const uniqueKeys = new Set([...Object.keys(object1), ...Object.keys(object2)]);

  return Array.from(uniqueKeys).sort();
};

const isNotChanged = (value1, value2) => value1 === value2;
const isDeleted = (value2) => value2 === undefined;
const isAdded = (value1) => value1 === undefined;

const renderLine = (key, object1, object2) => {
  const value1 = object1[key];
  const value2 = object2[key];
  if (isNotChanged(value1, value2)) {
    return `    ${key}: ${value1}`;
  }
  if (isDeleted(value2)) {
    return `  - ${key}: ${value1}`;
  }
  if (isAdded(value1)) {
    return `  + ${key}: ${value2}`;
  }

  return `  - ${key}: ${value1}\n  + ${key}: ${value2}`;
};

const renderLines = (keys, object1, object2) => {
  const lines = keys.map((key) => renderLine(key, object1, object2)).join('\n');

  return `{\n${lines}\n}`;
};

const compareFlatFiles = (object1, object2) => {
  const keys = getSortedUniqueKeys(object1, object2);

  return renderLines(keys, object1, object2);
};

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('0.0.1', '-V, --version', 'output the version number')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const object1 = readFile(filepath1);
    const object2 = readFile(filepath2);

    console.log(compareFlatFiles(object1, object2));
  })
  .option('-f, --format [type]', 'output format');

program.parse();

export default compareFlatFiles;
