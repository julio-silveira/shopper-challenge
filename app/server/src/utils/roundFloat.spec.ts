import { roundFloat } from './roundFloat';

describe('roundFloat', () => {
  it('should return a float with 2 decimal places', () => {
    const float = 10.123456789;
    const result = roundFloat(float);
    expect(result).toEqual(10.12);
  });
  it('should return a float with 3 decimal places', () => {
    const float = 10.123456789;
    const result = roundFloat(float, 3);
    expect(result).toEqual(10.123);
  });
});
