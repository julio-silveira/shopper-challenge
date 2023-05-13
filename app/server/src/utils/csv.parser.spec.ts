import { parsedCsvData } from '@Test/mocks/data';
import * as fs from 'fs';

import { csvParser } from './csv.parser';

describe('CSV Parser', () => {
  it('should parse a CSV file', async () => {
    const originalPathname = 'test/mocks/price.csv';
    const copyPathname = 'test/mocks/price.copy.csv';
    fs.copyFileSync(originalPathname, copyPathname);
    const csvData = await csvParser(copyPathname);
    expect(csvData).toEqual(parsedCsvData);
  });
});
