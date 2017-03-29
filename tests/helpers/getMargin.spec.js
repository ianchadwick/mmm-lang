
import { getPaddingBox } from 'css-math';
import getMargin from '../../src/helpers/getMargin';

describe('Get the margin box from the styles object', () => {
  it('should return a box with all zeros', () => {
    expect(getMargin({})).toEqual(getPaddingBox('0px'));
  });

  it('should return a box with all 10px', () => {
    expect(getMargin({
      margin: '10px',
    })).toEqual(getPaddingBox('10px'));
  });

  it('should return a box with all 10px and overridden bottom with 20px', () => {
    expect(getMargin({
      margin: '10px',
      marginBottom: '20px',
    })).toEqual(getPaddingBox('10px 10px 20px 10px'));
  });

  it('should return a box with all 10px overwriting the bottom value that appears first', () => {
    expect(getMargin({
      marginBottom: '20px',
      margin: '10px',
    })).toEqual(getPaddingBox('10px'));
  });
});
