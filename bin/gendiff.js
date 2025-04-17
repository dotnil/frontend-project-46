#!/usr/bin/env node

import { program } from 'commander';
import readFile from '../src/parsers.js';
import genDiff from '../src/main.js';

program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('0.0.1', '-V, --version', 'output the version number')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {

    console.log(genDiff(filepath1, filepath2, options.format));
  });

program.parse();
