import { describe, test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import plain from '../src/formatters/plain.js';
import genDiff from '../src/main.js';
import readFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('plain', () => {
  test('should format diff output in a stylish format', () => {
    const filepath1 = path.join(__dirname, '../__fixtures__/file1.json');
    const filepath2 = path.join(__dirname, '../__fixtures__/file2.json');

    const object1 = readFile(filepath1);
    const object2 = readFile(filepath2);

    const diff = genDiff(object1, object2);

    const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

    expect(plain(diff)).toBe(expected);
  });
});
