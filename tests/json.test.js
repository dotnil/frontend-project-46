import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gen-diff.js';
import readFile from '../src/parsers.js';
import json from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('json', () => {
  test('should format diff output in a JSON format', () => {
    const filepath1 = path.join(__dirname, '../__fixtures__/file1.json');
    const filepath2 = path.join(__dirname, '../__fixtures__/file2.json');

    const object1 = readFile(filepath1);
    const object2 = readFile(filepath2);

    const diff = genDiff(object1, object2);

    const jsonOutput = json(diff);

    expect(() => JSON.parse(jsonOutput)).not.toThrow();

    const expected = JSON.stringify(diff);
    expect(jsonOutput).toBe(expected);
  });
});
