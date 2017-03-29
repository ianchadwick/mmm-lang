
import dom from '../../../src/parser/node/dom';
import transform from '../../../src/transforms/font/html-email';

const getDom = html => dom(html).getRoot().ownerDocument;

describe('transform the fonts to their long forms with fall backs', () => {
  it('should return transformed html', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <h1 style="color: #ffffff;padding-top: 0;font-weight: 200;padding-right: 0;margin: 0;font-size: 36px;font-family: Arial;margin-left: 0;padding-left: 0;line-height: 45px;padding-bottom: 0;text-transform: none;text-rendering: optimizeLegibility;text-align: center">
            Create emails that are<br />
            out of this world
          </h1>
        </body>
      </html>`.trim();

    const result = `
      <html>
        <head></head>
        <body>
          <h1 style="color:#ffffff;padding-top:0;font-weight:200;padding-right:0;Margin:0;font-size:36px;font-family:Arial,Helvetica,sans-serif;margin-left:0;padding-left:0;line-height:45px;padding-bottom:0;text-transform:none;text-rendering:optimizeLegibility;text-align:center">
            Create emails that are<br>
            out of this world
          </h1>
        </body>
      </html>`.trim();

    expect(transform({ getDom, html })).toEqual(result);
  });

  it('should not transform fonts with fall backs defined', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <h1 style="font-family: Arial, Verdana">
            Create emails that are<br />
            out of this world
          </h1>
        </body>
      </html>`.trim();

    const result = `
      <html>
        <head></head>
        <body>
          <h1 style="font-family: Arial, Verdana">
            Create emails that are<br>
            out of this world
          </h1>
        </body>
      </html>`.trim();

    expect(transform({ getDom, html })).toEqual(result);
  });

  it('should transform Google font to fonts with fall back', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <h1 style="font-family: Source Sans Pro">
            Create emails that are<br />
            out of this world
          </h1>
        </body>
      </html>`.trim();

    const result = `
      <html>
        <head><!--[if mso]><style>.font-fallback-source-sans-pro{font-family:Helvetica,sans-serif!important}</style><![endif]--></head>
        <body>
          <h1 style="font-family:'Source Sans Pro',Helvetica,sans-serif" class="font-fallback-source-sans-pro">
            Create emails that are<br>
            out of this world
          </h1>
        </body>
      </html>`.trim();

    expect(transform({ getDom, html }))
      .toEqual(result);
  });
});
