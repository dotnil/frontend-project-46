import { program } from 'commander';

program
  .description(`Compares two configuration files and shows a difference.`)
  .helpOption('-h, --help', 'output usage information')
  .version('0.0.1', '-V, --version', 'output the version number')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format');

program.parse();
