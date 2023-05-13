import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';

export const csvParser = async (file: string) => {
  const PATH = path.join(__dirname, '../../', '/src/utils/preco.csv');

  return new Promise((resolve) => {
    const buffer = [];
    fs.createReadStream(PATH)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', (row) => {
        buffer.push({ productId: row[0], newPrice: row[1] });
      })
      .on('end', () => {
        resolve(buffer);
      });
  });
};
