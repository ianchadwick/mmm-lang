
import { render } from '../../../../src/components/head/font/html-email';

describe('render the font for email html', () => {
  it('should return commented tag for all but MS Office', () => {
    const attributes = {
      url: 'https://fonts.googleapis.com/css?family=Sans+Source+Pro',
    };

    expect(render(attributes)).toEqual(`<!--[if !mso]><!-->
    <style type="text/css">
      @import url("https://fonts.googleapis.com/css?family=Sans+Source+Pro");
    </style>
    <link
      href="https://fonts.googleapis.com/css?family=Sans+Source+Pro"
      rel="stylesheet"
      type="text/css"
    />
    <!--<![endif]-->`);
  });
});