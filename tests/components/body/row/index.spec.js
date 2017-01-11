
import Template from '../../../../src/template';
import parser from '../../../../src/components/body/row';

const createColumnMock = (attributes = {}, children = []) => {
  return {
    name: 'mmm-column',
    type: 'tag',
    children: children,
    attribs: attributes,
  };
};

const template = new Template();

describe('parse the row', () => {
  it('should return the number of columns', () => {
    const result = parser(template, {}, [
      createColumnMock(),
      createColumnMock(),
      createColumnMock(),
    ]);

    // parse and return the attributes
    expect(result.columns).toEqual(3);
  });

  /**
   * Column parsing
   */

  /**
   * Single column
   */
  it('should return a single column table', () => {
    const result = parser(template, {}, [
      createColumnMock(),
    ]);

    expect(result.children.length).toEqual(1);
    expect(result.children[0].attribs.width).toEqual('600px');
    expect(result.children[0].attribs.minWidth).toEqual('320px');
    expect(result.children[0].attribs.maxWidth).toEqual('600px');
    expect(result.children[0].attribs.mobileWidth).toEqual('320px');
    expect(result.children[0].attribs.calcWidth).toEqual('calc(28000% - 173000px)');
  });

  /**
   * Two columns
   */
  it('should return a two column table', () => {
    const result = parser(template, {}, [
      createColumnMock(),
      createColumnMock(),
    ]);

    expect(result.children.length).toEqual(2);

    for (let i = 0; i < 2; i += 1) {
      expect(result.children[i].attribs.width).toEqual('300px');
      expect(result.children[i].attribs.minWidth).toEqual('300px');
      expect(result.children[i].attribs.maxWidth).toEqual('320px');
      expect(result.children[0].attribs.mobileWidth).toEqual('320px');
      expect(result.children[i].attribs.calcWidth).toEqual('calc(12700px - 2000%)');
    }
  });

  /**
   * Three columns
   */
  it('should return a three column table', () => {
    const result = parser(template, {}, [
      createColumnMock(),
      createColumnMock(),
      createColumnMock(),
    ]);

    expect(result.children.length).toEqual(3);

    for (let i = 0; i < 3; i += 1) {
      expect(result.children[i].attribs.width).toEqual('200px');
      expect(result.children[i].attribs.minWidth).toEqual('200px');
      expect(result.children[i].attribs.maxWidth).toEqual('320px');
      expect(result.children[0].attribs.mobileWidth).toEqual('320px');
      expect(result.children[i].attribs.calcWidth).toEqual('calc(74600px - 12000%)');
    }
  });

  /**
   * Single column with spacing outside
   */
  it('should return a table with a single column and outside spacing', () => {
    const attributes = {
      spacing: 'outside',
      spacingColor: 'green',
      spacingWidth: '12px',
    };

    const result = parser(template, attributes, [
      createColumnMock(),
    ]);

    expect(result.contentWidth).toEqual('600px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');

    expect(result.children.length).toEqual(1);
    expect(result.children[0].attribs.width).toEqual('576px');
    expect(result.children[0].attribs.minWidth).toEqual('296px');
    expect(result.children[0].attribs.maxWidth).toEqual('576px');
    expect(result.children[0].attribs.mobileWidth).toEqual('296px');
    expect(result.children[0].attribs.calcWidth).toEqual('calc(28000% - 173024px)');
  });

  /**
   * Two columns with spacing outside
   */
  it('should return a table with two columns and outside spacing', () => {
    const attributes = {
      spacing: 'outside',
      spacingColor: 'green',
      spacingWidth: '12px',
    };

    const result = parser(template, attributes, [
      createColumnMock(),
      createColumnMock(),
    ]);

    expect(result.contentWidth).toEqual('600px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');

    expect(result.children.length).toEqual(2);

    for (let i = 0; i < 2; i += 1) {
      expect(result.children[i].attribs.width).toEqual('288px');
      expect(result.children[i].attribs.minWidth).toEqual('288px');
      expect(result.children[i].attribs.maxWidth).toEqual('296px');
      expect(result.children[i].attribs.mobileWidth).toEqual('296px');
      expect(result.children[i].attribs.calcWidth).toEqual('calc(5248px - 800%)');
    }
  });

  /**
   * Single column with spacing inside
   */
  it('should return a table with a single column and inside spacing', () => {
    const attributes = {
      spacing: 'inside',
      spacingColor: 'green',
      spacingWidth: '12px',
    };

    const result = parser(template, attributes, [
      createColumnMock(),
    ]);

    expect(result.contentWidth).toEqual('600px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');

    expect(result.children.length).toEqual(1);
    expect(result.children[0].attribs.width).toEqual('600px');
    expect(result.children[0].attribs.minWidth).toEqual('320px');
    expect(result.children[0].attribs.maxWidth).toEqual('600px');
    expect(result.children[0].attribs.mobileWidth).toEqual('320px');
    expect(result.children[0].attribs.calcWidth).toEqual('calc(28000% - 173000px)');
  });

  /**
   * Two columns with spacing inside
   */
  it('should return a table with two columns and inside spacing', () => {
    const attributes = {
      spacing: 'inside',
      spacingColor: 'green',
      spacingWidth: '12px',
    };

    const result = parser(template, attributes, [
      createColumnMock(),
      createColumnMock(),
    ]);

    expect(result.contentWidth).toEqual('600px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');

    expect(result.children.length).toEqual(2);

    for (let i = 0; i < 2; i += 1) {
      expect(result.children[i].attribs.width).toEqual('294px');
      expect(result.children[i].attribs.minWidth).toEqual('294px');
      expect(result.children[i].attribs.maxWidth).toEqual('320px');
      expect(result.children[i].attribs.mobileWidth).toEqual('320px');
      expect(result.children[i].attribs.calcWidth).toEqual('calc(16414px - 2600%)');
    }
  });

  /**
   * Single column with spacing both
   */
  it('should return a table with a single column and both spacing', () => {
    const attributes = {
      spacing: 'both',
      spacingColor: 'green',
      spacingWidth: '12px',
    };

    const result = parser(template, attributes, [
      createColumnMock(),
    ]);

    expect(result.contentWidth).toEqual('600px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');

    expect(result.children.length).toEqual(1);
    expect(result.children[0].attribs.width).toEqual('576px');
    expect(result.children[0].attribs.minWidth).toEqual('296px');
    expect(result.children[0].attribs.maxWidth).toEqual('576px');
    expect(result.children[0].attribs.mobileWidth).toEqual('296px');
    expect(result.children[0].attribs.calcWidth).toEqual('calc(28000% - 173024px)');
  });

  /**
   * Two columns with spacing both
   */
  it('should return a table with two columns and both spacing', () => {
    const attributes = {
      spacing: 'both',
      spacingColor: 'green',
      spacingWidth: '12px',
    };

    const result = parser(template, attributes, [
      createColumnMock(),
      createColumnMock(),
    ]);

    expect(result.contentWidth).toEqual('600px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');

    expect(result.children.length).toEqual(2);

    for (let i = 0; i < 2; i += 1) {
      expect(result.children[i].attribs.width).toEqual('282px');
      expect(result.children[i].attribs.minWidth).toEqual('282px');
      expect(result.children[i].attribs.maxWidth).toEqual('296px');
      expect(result.children[i].attribs.mobileWidth).toEqual('296px');
      expect(result.children[i].attribs.calcWidth).toEqual('calc(8962px - 1400%)');
    }
  });

  /**
   * Three columns with spacing both
   */
  it('should return a table with three columns and both spacing', () => {
    const attributes = {
      spacing: 'both',
      spacingColor: 'green',
      spacingWidth: '12px',
    };

    const result = parser(template, attributes, [
      createColumnMock(),
      createColumnMock(),
      createColumnMock(),
    ]);

    expect(result.contentWidth).toEqual('600px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');

    expect(result.children.length).toEqual(3);

    for (let i = 0; i < 3; i += 1) {
      expect(result.children[i].attribs.width).toEqual('184px');
      expect(result.children[i].attribs.minWidth).toEqual('184px');
      expect(result.children[i].attribs.maxWidth).toEqual('296px');
      expect(result.children[i].attribs.mobileWidth).toEqual('296px');
      expect(result.children[i].attribs.calcWidth).toEqual('calc(69624px - 11200%)');
    }
  });
});
