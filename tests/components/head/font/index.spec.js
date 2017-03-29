
import font from '../../../../src/components/head/font';

describe('parse the font and return the url', () => {
  it('should return the basic font url for google', () => {
    const attributes = {
      name: 'Source Sans Pro',
      provider: 'google',
    };

    expect(font(attributes)).toEqual({
      url: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400,700',
    });
  });

  it('should return url with font weights', () => {
    const attributes = {
      name: 'Source Sans Pro',
      provider: 'google',
      weight: '400,600',
    };

    expect(font(attributes)).toEqual({
      url: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600',
    });
  });

  it('should return url with font subset', () => {
    const attributes = {
      name: 'Source Sans Pro',
      provider: 'google',
      subset: 'latin-ext',
    };

    expect(font(attributes)).toEqual({
      url: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400,700&amp;subset=latin-ext',
    });
  });

  it('should resolve a Google Font', () => {
    const attributes = {
      name: 'Source Sans Pro',
    };

    expect(font(attributes)).toEqual({
      url: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,400,700',
    });
  });

  it('should not resolve a standard safe font', () => {
    const attributes = {
      name: 'Arial',
    };

    expect(font(attributes)).toEqual({
      url: '',
    });
  });
});