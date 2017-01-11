
import dot from '../../src/helpers/dot';

describe('object to dot notation', () => {
  it('should return a key => value pair object', () => {
    const result = dot({
      a: 1,
      b: {
        c: 2,
        d: 3,
      },
      c: new Date(),
    });

    expect(result, {
      'a': 1,
      'b.c': 2,
      'b.d': 3,
      'c': new Date(),
    });
  });
});
