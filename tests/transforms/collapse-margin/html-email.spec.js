
import dom from '../../../src/parser/node/dom';
import transform, { attributeName } from '../../../src/transforms/collapse-margin/html-email';

const getDom = html => dom(html).getRoot().ownerDocument;


describe('transform any margins that should have collapsed', () => {
  it('should return html without data tags', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div ${attributeName}="24px"></div>
        </body>
      </html>`.trim();

    const result = `
      <html>
        <head></head>
        <body>
          <div></div>
        </body>
      </html>`.trim();

    expect(transform({ getDom, html })).toEqual(result);
  });

  it('should return html with no added margins to the child', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div ${attributeName}="24px">
            <p>Hello there</p>
          </div>
        </body>
      </html>`.trim();

    const result = `
      <html>
        <head></head>
        <body>
          <div>
            <p>Hello there</p>
          </div>
        </body>
      </html>`.trim();

    expect(transform({ getDom, html })).toEqual(result);
  });

  it('should remove the top margin on the first child', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div ${attributeName}="24px">
            <p style="margin-top: 24px">Hello there</p>
          </div>
        </body>
      </html>`.trim();

    const result = `
      <html>
        <head></head>
        <body>
          <div>
            <p>Hello there</p>
          </div>
        </body>
      </html>`.trim();

    expect(transform({ getDom, html })).toEqual(result);
  });

  it('should add the difference to the child margin', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div ${attributeName}="24px">
            <p style="margin-top: 36px">Hello there</p>
          </div>
        </body>
      </html>`.trim();

    const result = `
      <html>
        <head></head>
        <body>
          <div>
            <p style="Margin:12px 0px 0px 0px">Hello there</p>
          </div>
        </body>
      </html>`.trim();

    expect(transform({ getDom, html })).toEqual(result);
  });

  it('should add the margin to the first child of many', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div ${attributeName}="24px">
            <p style="margin-top: 36px">Hello there</p>
            <p style="margin-top: 36px">Hello there</p>
            <p style="margin-top: 36px">Hello there</p>
          </div>
        </body>
      </html>`.trim();

    const result = `
      <html>
        <head></head>
        <body>
          <div>
            <p style="Margin:12px 0px 0px 0px">Hello there</p>
            <p style="margin-top: 36px">Hello there</p>
            <p style="margin-top: 36px">Hello there</p>
          </div>
        </body>
      </html>`.trim();

    expect(transform({ getDom, html })).toEqual(result);
  });

  it('should remove the bottom margin on the last child', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div ${attributeName}="24px">
            <p style="margin-bottom: 24px">Hello there</p>
          </div>
        </body>
      </html>`.trim();

    const result = `
      <html>
        <head></head>
        <body>
          <div>
            <p>Hello there</p>
          </div>
        </body>
      </html>`.trim();

    expect(transform({ getDom, html })).toEqual(result);
  });

  it('should add the difference to the child margin', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div ${attributeName}="24px">
            <p style="margin-bottom: 36px">Hello there</p>
          </div>
        </body>
      </html>`.trim();

    const result = `
      <html>
        <head></head>
        <body>
          <div>
            <p style="Margin:0px 0px 12px 0px">Hello there</p>
          </div>
        </body>
      </html>`.trim();

    expect(transform({ getDom, html })).toEqual(result);
  });

  it('should add the margin to the last child of many', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div ${attributeName}="24px">
            <p style="margin-bottom: 36px">Hello there</p>
            <p style="margin-bottom: 36px">Hello there</p>
            <p style="margin-bottom: 36px">Hello there</p>
          </div>
        </body>
      </html>`.trim();

    const result = `
      <html>
        <head></head>
        <body>
          <div>
            <p style="margin-bottom: 36px">Hello there</p>
            <p style="margin-bottom: 36px">Hello there</p>
            <p style="Margin:0px 0px 12px 0px">Hello there</p>
          </div>
        </body>
      </html>`.trim();

    expect(transform({ getDom, html })).toEqual(result);
  });

  it('should add the margin to the first and last children', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div ${attributeName}="24px">
            <p style="margin-top: 36px;margin-bottom: 36px">Hello there</p>
            <p style="margin-top: 36px;margin-bottom: 36px">Hello there</p>
            <p style="margin-top: 36px;margin-bottom: 36px">Hello there</p>
          </div>
        </body>
      </html>`.trim();

    const result = `
      <html>
        <head></head>
        <body>
          <div>
            <p style="Margin:12px 0px 36px 0px">Hello there</p>
            <p style="margin-top: 36px;margin-bottom: 36px">Hello there</p>
            <p style="Margin:36px 0px 12px 0px">Hello there</p>
          </div>
        </body>
      </html>`.trim();

    expect(transform({ getDom, html })).toEqual(result);
  });

  it('should remove both margins', () => {
    const html = `
      <html>
        <head></head>
        <body>
          <div ${attributeName}="24px 0 24px 0">
            <p style="margin-top: 0px;margin-bottom: 24px;">Hello there</p>
          </div>
        </body>
      </html>`.trim();

    const result = `
      <html>
        <head></head>
        <body>
          <div>
            <p>Hello there</p>
          </div>
        </body>
      </html>`.trim();

    expect(transform({ getDom, html })).toEqual(result);
  });
});
