import fs from 'fs';

const readFile = (filepath) => {
  try {
    const content = fs.readFileSync(filepath, 'utf8');

    return JSON.parse(content);
  } catch (err) {
    console.error('Ошибка чтения файла:', err);
  }
};

export default readFile;
