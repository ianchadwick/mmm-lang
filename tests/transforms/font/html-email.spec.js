
import transform from '../../../src/transforms/font/html-email';


describe('transform the fonts to their long forms with fall backs', () => {
  it('should return transformed html', () => {
    const html = `<h1 style="color: #ffffff;padding-top: 0;margin-top: 0;font-weight: 200;padding-right: 0;margin-right: 0;margin: 0;font-size: 36px;font-family: Arial;margin-left: 0;padding-left: 0;margin-bottom: 30px;line-height: 45px;padding-bottom: 0;text-transform: none;text-rendering: optimizeLegibility;text-align: center">
                    Create emails that are<br>
                    out of this world
                   </h1>`;

    const result = `<h1 style="color: #ffffff;padding-top: 0;margin-top: 0;font-weight: 200;padding-right: 0;margin-right: 0;margin: 0;font-size: 36px;font-family: Arial,Helvetica,sans-serif;margin-left: 0;padding-left: 0;margin-bottom: 30px;line-height: 45px;padding-bottom: 0;text-transform: none;text-rendering: optimizeLegibility;text-align: center">
                    Create emails that are<br>
                    out of this world
                   </h1>`;

    expect(transform({ html})).toEqual(result);
  });

  it('should not transform fonts with fall backs defined', () => {
    const html = `<h1 style="font-family: Arial, Verdana">
                    Create emails that are<br>
                    out of this world
                   </h1>`;

    expect(transform({ html})).toEqual(html);
  });
});
