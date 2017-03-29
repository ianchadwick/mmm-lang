
import Template from '../../../../src/template';
import parser from '../../../../src/components/body/image';

const parentAttributes = {
  mobileWidth: '320px',
  width: '600px',
  padding: '0px',
};

describe('Parsing the image component', () => {
  it('should return an object with the passed attributes', () => {
    const attributes = {
      src: 'https://www.mizmoz.com/img/logo.png',
      url: 'https://www.mizmoz.com/',
    };

    expect(parser(attributes, [], { parentAttributes })).toEqual({
      align: 'center',
      alt: '',
      display: 'block',
      height: 'auto',
      padding: '0px',
      src: 'https://www.mizmoz.com/img/logo.png',
      url: 'https://www.mizmoz.com/',
      mobileWidth: parentAttributes.mobileWidth,
      width: '',
      contentWidth: parentAttributes.width,
      color: '',
      fontFamily: '',
      fontSize: '',
    });
  });

  it('should return the correct mobileWidth & width when padding is 10px', () => {
    const parentAttributesTest = Object.assign({}, parentAttributes, {
      padding: '10px',
    });

    const result = parser({}, [], { parentAttributes: parentAttributesTest });

    expect(result.contentWidth).toEqual('580px');
    expect(result.mobileWidth).toEqual('300px');
  });

  it('should return the correct mobileWidth & width when padding is 20px 15px', () => {
    const parentAttributesTest = Object.assign({}, parentAttributes, {
      padding: '20px 15px',
    });

    const result = parser({}, [], { parentAttributes: parentAttributesTest });

    expect(result.contentWidth).toEqual('570px');
    expect(result.mobileWidth).toEqual('290px');
  });
});
