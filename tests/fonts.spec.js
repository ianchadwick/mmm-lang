
import { getFontForCSS } from '../src/fonts';

describe('fonts management', () => {
  it('return the font-family definition for a websafe font', () => {
    expect(getFontForCSS('Arial')).toEqual('Arial,Helvetica,sans-serif');
  });

  it('return the font-family definition for a websafe font with spaces', () => {
    expect(getFontForCSS('Times New Roman')).toEqual("'Times New Roman',Times,sans-serif");
  });

  it('return the font-family definition for a google font', () => {
    expect(getFontForCSS('Source Sans Pro')).toEqual("'Source Sans Pro',Helvetica,sans-serif");
  });
});
