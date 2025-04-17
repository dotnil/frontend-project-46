import { describe, test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import displayDiff from '../src/formatters/stylish.js';
import { genState } from '../src/main.js';
import readFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('displayDiff', () => {
  test('should format diff output in a stylish format', () => {
    const filepath1 = path.join(__dirname, '../__fixtures__/file1.json');
    const filepath2 = path.join(__dirname, '../__fixtures__/file2.json');

    const object1 = readFile(filepath1);
    const object2 = readFile(filepath2);

    const diff = genState(object1, object2);

    const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

    expect(displayDiff(diff)).toBe(expected);
  });
});
