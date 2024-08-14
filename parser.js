import fs from 'fs';

const readFile = (filepath) => {
  try {
    const data = fs.readFileSync(filepath, 'utf8');
    console.log('Содержимое файла:', JSON.parse(data));
  } catch (err) {
    console.error('Ошибка чтения файла:', err);
  }
};

export default readFile;
