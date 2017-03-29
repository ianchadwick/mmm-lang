
import { render } from '../../../../src/components/head/font/html5';

describe('render the font', () => {
  it('should return the basic link html tag', () => {
    const attributes = {
      url: 'https://fonts.googleapis.com/css?family=Sans+Source+Pro',
    };

    expect(render(attributes))
      .toEqual(`<link href="https://fonts.googleapis.com/css?family=Sans+Source+Pro" rel="stylesheet">`);
  });
});