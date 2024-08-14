import { program } from 'commander';
import readFile from './parser.js';

program
  .description(`Compares two configuration files and shows a difference.`)
  .helpOption('-h, --help', 'output usage information')
  .version('0.0.1', '-V, --version', 'output the version number')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    readFile(filepath1)
    readFile(filepath2)

    console.log(options)
  })
  .option('-f, --format [type]', 'output format');

program.parse();
