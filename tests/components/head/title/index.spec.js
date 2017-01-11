
import title from '../../../../src/components/head/title';

describe('parse the title', () => {
  it('should return the title', () => {
    const children = [{
      data: 'Impending Cat-astrophe',
    }];

    expect(title('', {}, children)).toEqual({
      title: 'Impending Cat-astrophe',
    });
  });
});
