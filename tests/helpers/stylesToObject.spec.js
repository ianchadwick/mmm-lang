
import stylesToObject from '../../src/helpers/stylesToObject';

describe('convert style attributes to an object', () => {
  it('should return an object with each style as key => value pair', () => {
    const result = stylesToObject('font-family: Arial; color:#FFFFFF;width: 100%');

    expect(result).toEqual({
      color: '#FFFFFF',
      fontFamily: 'Arial',
      width: '100%',
    });
  });

  it('should return an object with an array value when multiple values with the same name exist', () => {
    const result = stylesToObject('color:#FFFFFF; width: 100%;width: calc(2 * 2px);');

    expect(result).toEqual({
      color: '#FFFFFF',
      width: [
        '100%',
        'calc(2 * 2px)',
      ],
    });
  });

  it('should skip bad styles', () => {
    const result = stylesToObject('color;width:100px');

    expect(result).toEqual({
      width: '100px',
    });
  });
});
