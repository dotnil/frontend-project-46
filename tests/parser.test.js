import { describe, test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import readFile from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('gendiff CLI with real files', () => {
  test('test 42', () => {
    const filepath = path.join(__dirname, '../__fixtures__/file1.json');

    expect(readFile(filepath)).toStrictEqual({
      follow: false, host: 'hexlet.io', proxy: '123.234.53.22', timeout: 50,
    });
  });
});
