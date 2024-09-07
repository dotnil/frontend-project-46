import { program } from 'commander';
import readFile from './parsers.js';
import formatDiff from './stylish.js';

const getSortedUniqueKeys = (object1, object2) => {
  const uniqueKeys = new Set([...Object.keys(object1), ...Object.keys(object2)]);

  return Array.from(uniqueKeys).sort();
};

const isNotChanged = (value1, value2) => value1 === value2;
const isDeleted = (value2) => value2 === undefined;
const isAdded = (value1) => value1 === undefined;

const formatKeyChange = (key, operation, value) => {
  return { [key]: { operation, value } };
};

const compareFlatFiles = (object1, object2) => {
  const keys = getSortedUniqueKeys(object1, object2);
  const result = [];

  keys.forEach((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (isNotChanged(value1, value2)) {
      return;
    }
    if (isDeleted(value2)) {
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

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('0.0.1', '-V, --version', 'output the version number')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const object1 = readFile(filepath1);
    const object2 = readFile(filepath2);

    const diff = compareFlatFiles(object1, object2);

    console.log(JSON.stringify(diff, null, 2));
    console.log(formatDiff(diff));
  })
  .option('-f, --format [type]', 'output format');

program.parse();

export default compareFlatFiles;
