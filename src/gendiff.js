import { program } from 'commander';
import readFile from './parsers.js';
import formatDiff from '../formatters/index.js';
import genDiff from './gen-diff.js';

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

    const diff = genDiff(object1, object2);

    console.log(formatDiff(diff, options.format));
  });

program.parse();

export default genDiff;
