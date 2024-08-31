import { describe, test, expect } from '@jest/globals';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('gendiff CLI with real files', () => {
  test('should output correct diff for given file paths', (done) => {
    const filepath1 = path.join(__dirname, '../__fixtures__/file1.json');
    const filepath2 = path.join(__dirname, '../__fixtures__/file2.json');

    const command = `node ./src/gendiff.js ${filepath1} ${filepath2}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        done(error);
        return;
      }

      if (stderr) {
        done(new Error(stderr));
        return;
      }

      const expectedOutput = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}\n`;

      expect(stdout).toBe(expectedOutput);

      done();
    });
  });
});
