
import Template from '../../../../src/template';
import parser from '../../../../src/components/body/row';

const template = new Template();

const createColumnMock = (attributes = {}, children = []) => {
  return {
    tagName: 'mmm-column',
    children: children,
    attributes: attributes,
    getAttribute: jest.fn(),
    setAttribute: jest.fn(),
    //setAttribute: console.log,
  };
};

const createParserMock = (columns = 1, attributes = {}, extra = {}) => {
  const children = [];

  switch (columns) {
    case 3:
      children.push(createColumnMock());
    case 2:
      children.push(createColumnMock());
    case 1:
      children.push(createColumnMock());
  }

  return parser(
    attributes,
    children,
    Object.assign({}, { template }, extra)
  );
};

describe('Parsing the row component', () => {
  it('should return the number of columns', () => {
    const result = createParserMock(3);

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
    const result = createParserMock();

    const firstChild = result.children[0];
    const setAttribute = firstChild.setAttribute;

    expect(result.children.length).toEqual(1);
    expect(setAttribute).toBeCalledWith('width', '600px');
    expect(setAttribute).toBeCalledWith('min-width', '320px');
    expect(setAttribute).toBeCalledWith('max-width', '600px');
    expect(setAttribute).toBeCalledWith('mobile-width', '320px');
    expect(setAttribute).toBeCalledWith('calc-width', 'calc(28000% - 173000px)');
  });

  /**
   * Two columns
   */
  it('should return a two column table', () => {
    const result = createParserMock(2);

    expect(result.children.length).toEqual(2);

    for (let i = 0; i < 2; i += 1) {
      const setAttribute = result.children[i].setAttribute;
      expect(setAttribute).toBeCalledWith('width', '300px');
      expect(setAttribute).toBeCalledWith('min-width', '300px');
      expect(setAttribute).toBeCalledWith('max-width', '320px');
      expect(setAttribute).toBeCalledWith('mobile-width', '320px');
      expect(setAttribute).toBeCalledWith('calc-width', 'calc(12700px - 2000%)');
    }
  });

  /**
   * Three columns
   */
  it('should return a three column table', () => {
    const result = createParserMock(3);

    expect(result.children.length).toEqual(3);

    for (let i = 0; i < 3; i += 1) {
      const setAttribute = result.children[i].setAttribute;
      expect(setAttribute).toBeCalledWith('width', '200px');
      expect(setAttribute).toBeCalledWith('min-width', '200px');
      expect(setAttribute).toBeCalledWith('max-width', '320px');
      expect(setAttribute).toBeCalledWith('mobile-width', '320px');
      expect(setAttribute).toBeCalledWith('calc-width', 'calc(74600px - 12000%)');
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

    const result = createParserMock(1, attributes);

    expect(result.contentWidth).toEqual('600px');
    expect(result.contentInnerWidth).toEqual('576px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');
    expect(result.children.length).toEqual(1);

    const setAttribute = result.children[0].setAttribute;
    expect(setAttribute).toBeCalledWith('width', '576px');
    expect(setAttribute).toBeCalledWith('min-width', '296px');
    expect(setAttribute).toBeCalledWith('max-width', '576px');
    expect(setAttribute).toBeCalledWith('mobile-width', '296px');
    expect(setAttribute).toBeCalledWith('calc-width', 'calc(28000% - 173024px)');
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

    const result = createParserMock(2, attributes);

    expect(result.contentWidth).toEqual('600px');
    expect(result.contentInnerWidth).toEqual('576px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');

    expect(result.children.length).toEqual(2);

    for (let i = 0; i < 2; i += 1) {
      const setAttribute = result.children[i].setAttribute;
      expect(setAttribute).toBeCalledWith('width', '288px');
      expect(setAttribute).toBeCalledWith('min-width', '288px');
      expect(setAttribute).toBeCalledWith('max-width', '296px');
      expect(setAttribute).toBeCalledWith('mobile-width', '296px');
      expect(setAttribute).toBeCalledWith('calc-width', 'calc(5248px - 800%)');
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

    const result = createParserMock(1, attributes);

    expect(result.contentWidth).toEqual('600px');
    expect(result.contentInnerWidth).toEqual('600px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');
    expect(result.children.length).toEqual(1);

    const setAttribute = result.children[0].setAttribute;
    expect(setAttribute).toBeCalledWith('width', '600px');
    expect(setAttribute).toBeCalledWith('min-width', '320px');
    expect(setAttribute).toBeCalledWith('max-width', '600px');
    expect(setAttribute).toBeCalledWith('mobile-width', '320px');
    expect(setAttribute).toBeCalledWith('calc-width', 'calc(28000% - 173000px)');
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

    const result = createParserMock(2, attributes);

    expect(result.contentWidth).toEqual('600px');
    expect(result.contentInnerWidth).toEqual('600px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');

    expect(result.children.length).toEqual(2);

    for (let i = 0; i < 2; i += 1) {
      const setAttribute = result.children[i].setAttribute;
      expect(setAttribute).toBeCalledWith('width', '294px');
      expect(setAttribute).toBeCalledWith('min-width', '294px');
      expect(setAttribute).toBeCalledWith('max-width', '320px');
      expect(setAttribute).toBeCalledWith('mobile-width', '320px');
      expect(setAttribute).toBeCalledWith('calc-width', 'calc(16414px - 2600%)');
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

    const result = createParserMock(1, attributes);

    expect(result.contentWidth).toEqual('600px');
    expect(result.contentInnerWidth).toEqual('576px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');
    expect(result.children.length).toEqual(1);

    const setAttribute = result.children[0].setAttribute;
    expect(setAttribute).toBeCalledWith('width', '576px');
    expect(setAttribute).toBeCalledWith('min-width', '296px');
    expect(setAttribute).toBeCalledWith('max-width', '576px');
    expect(setAttribute).toBeCalledWith('mobile-width', '296px');
    expect(setAttribute).toBeCalledWith('calc-width', 'calc(28000% - 173024px)');
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

    const result = createParserMock(2, attributes);

    expect(result.contentWidth).toEqual('600px');
    expect(result.contentInnerWidth).toEqual('576px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');
    expect(result.children.length).toEqual(2);

    for (let i = 0; i < 2; i += 1) {
      const setAttribute = result.children[0].setAttribute;
      expect(setAttribute).toBeCalledWith('width', '282px');
      expect(setAttribute).toBeCalledWith('min-width', '282px');
      expect(setAttribute).toBeCalledWith('max-width', '296px');
      expect(setAttribute).toBeCalledWith('mobile-width', '296px');
      expect(setAttribute).toBeCalledWith('calc-width', 'calc(8962px - 1400%)');
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

    const result = createParserMock(3, attributes);

    expect(result.contentWidth).toEqual('600px');
    expect(result.contentInnerWidth).toEqual('576px');
    expect(result.minWidth).toEqual('320px');
    expect(result.maxWidth).toEqual('600px');
    expect(result.mobileWidth).toEqual('320px');
    expect(result.calcWidth).toEqual('calc(28000% - 173000px)');
    expect(result.children.length).toEqual(3);

    for (let i = 0; i < 3; i += 1) {
      const setAttribute = result.children[0].setAttribute;
      expect(setAttribute).toBeCalledWith('width', '184px');
      expect(setAttribute).toBeCalledWith('min-width', '184px');
      expect(setAttribute).toBeCalledWith('max-width', '296px');
      expect(setAttribute).toBeCalledWith('mobile-width', '296px');
      expect(setAttribute).toBeCalledWith('calc-width', 'calc(69624px - 11200%)');
    }
  });

  /**
   * Row should use parent width when no width is supplied and parent width is available
   */
  it('should return a table with parent width when no width is supplied', () => {
    const result = createParserMock(1, {}, {
      parentAttributes: {
        width: '576px',
        mobileWidth: '296px',
      },
    });

    expect(result.contentWidth).toEqual('576px');
    expect(result.contentInnerWidth).toEqual('576px');
    expect(result.minWidth).toEqual('296px');
    expect(result.maxWidth).toEqual('576px');
    expect(result.mobileWidth).toEqual('296px');
    expect(result.calcWidth).toEqual('calc(28000% - 173024px)');
    expect(result.children.length).toEqual(1);

    const setAttribute = result.children[0].setAttribute;
    expect(setAttribute).toBeCalledWith('width', '576px');
    expect(setAttribute).toBeCalledWith('min-width', '296px');
    expect(setAttribute).toBeCalledWith('max-width', '576px');
    expect(setAttribute).toBeCalledWith('mobile-width', '296px');
    expect(setAttribute).toBeCalledWith('calc-width', 'calc(28000% - 173024px)');
  });

  /**
   * Row should use parent width when no width is supplied and parent width is available
   */
  it('should return a table with parent width & padding when no width is supplied', () => {
    const result = createParserMock(1, {}, {
      parentAttributes: {
        width: '600px',
        mobileWidth: '320px',
        padding: '12px',
      },
    });

    expect(result.contentWidth).toEqual('576px');
    expect(result.contentInnerWidth).toEqual('576px');
    expect(result.minWidth).toEqual('296px');
    expect(result.maxWidth).toEqual('576px');
    expect(result.mobileWidth).toEqual('296px');
    expect(result.calcWidth).toEqual('calc(28000% - 173024px)');
    expect(result.children.length).toEqual(1);

    const setAttribute = result.children[0].setAttribute;
    expect(setAttribute).toBeCalledWith('padding', '0px');
    expect(setAttribute).toBeCalledWith('width', '576px');
    expect(setAttribute).toBeCalledWith('min-width', '296px');
    expect(setAttribute).toBeCalledWith('max-width', '576px');
    expect(setAttribute).toBeCalledWith('mobile-width', '296px');
    expect(setAttribute).toBeCalledWith('calc-width', 'calc(28000% - 173024px)');
  });
});
