import { parse } from 'csv-parse';
import * as fs from 'fs';

export const csvParser = async (filePath: string): Promise<string[][]> => {
  const csvData: string[][] = await new Promise((resolve) => {
    const buffer: string[][] = [];
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', (row) => {
        buffer.push(row);
      })
      .on('end', () => {
        resolve(buffer);
      });
  });

  deleteTempFile(filePath);

  return csvData;
};

const deleteTempFile = (filePath: string) => {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {}
};
