import { program } from 'commander';
import readFile from './parsers.js';
import stylish from './stylish.js';
import compareFlatFiles from './compare-flat-files.js';

const formatters = {
  stylish,
  // другие форматтеры
};

const formatDiffWithDefault = (diff, format = 'stylish') => {
  const formatter = formatters[format] || stylish;
  return formatter(diff);
};

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('0.0.1', '-V, --version', 'output the version number')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const object1 = readFile(filepath1);
    const object2 = readFile(filepath2);

    const diff = compareFlatFiles(object1, object2);
    // console.log(JSON.stringify(diff, null, 2));
    console.log(formatDiffWithDefault(diff, options.format));
  });

program.parse();

export default compareFlatFiles;
