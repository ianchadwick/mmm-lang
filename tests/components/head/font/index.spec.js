
import font from '../../../../src/components/head/font';

describe('parse the font and return the url', () => {
  it('should return the basic font url for google', () => {
    const attributes = {
      name: 'Sans Source Pro',
      provider: 'google',
    };

    expect(font(attributes, [])).toEqual({
      url: 'https://fonts.googleapis.com/css?family=Sans+Source+Pro',
    });
  });

  it('should return url with font weights', () => {
    const attributes = {
      name: 'Sans Source Pro',
      provider: 'google',
      weight: '400,500',
    };

    expect(font(attributes, [])).toEqual({
      url: 'https://fonts.googleapis.com/css?family=Sans+Source+Pro:400,500',
    });
  });

  it('should return url with font subset', () => {
    const attributes = {
      name: 'Sans Source Pro',
      provider: 'google',
      subset: 'latin-ext',
    };

    expect(font(attributes, [])).toEqual({
      url: 'https://fonts.googleapis.com/css?family=Sans+Source+Pro&amp;subset=latin-ext',
    });
  });
});