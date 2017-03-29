
import { min } from 'css-math';
import { getPaddingBox, parser as cssParser } from 'css-math';
import { findAndReplaceUnits } from 'css-math/lib/parser';
import parser from './index';
import wrapper from '../../wrapper';
import { getAlignmentClassName } from '../../body/row/styleHelper';
import attributesToString from '../../../helpers/attributesToString';

/**
 * Wrap the image with an anchor if a url has been passed
 *
 * @param url
 * @param image
 * @return string
 */
export const wrapAnchor = (url, image) => {
  return (url ? `<a href="${url}" target="_blank">${image}</a>` : image);
};

const renderInline = (attributes, { parserComponent }) => {

  return parseComponent('mmm-box', {
    'class': 'mmm-button',
    align,
    backgroundColor,
    color,
    fontFamily,
    fontSize,
    borderRadius,
    innerHtml: text,
    textAlign: 'center',
    margin,
    padding,
    width,
    wrapper: (html) => `<a href="${url}" style="color: ${color}; text-decoration: none; box-shadow: ${boxShadow}">${html}</a>`,
  });
};

/**
 * Parse the image tag
 *
 * @param attributes
 * @return string
 */
export const render = ({ align, alt, className, contentWidth, display, mobileWidth, padding, src, width, url }, { parser, parseComponent, template }) => {
  const imgClassName = `mmm-${display}`;
  template.getStyles().add({
    '@media only screen and (max-width: 999999px)': {
      [`.mmm-image img.${imgClassName}`]: {
        height: 'auto !important',
        width: '100% !important',
        display: display,
      },
    },
  });

  const paddingBox = getPaddingBox(padding);
  const imageWidth = cssParser(`${contentWidth} - ${paddingBox.width}`);
  const imageAttrWidth = min([width, imageWidth]);
  const maxWidth = (width ? width : '100%');
  const widthValue = findAndReplaceUnits(imageAttrWidth).value;

  const attributes = {
    img: attributesToString({
      'class': `${imgClassName} ${getAlignmentClassName(align)}`,
      src: src,
      alt: alt || ' ',
      align: align,
      width: widthValue,
      border: '0',
      style: {
        width: '100%',
        maxWidth: maxWidth,
      },
    }),
    mmmRow: attributesToString({
      'class': className('mmm-image'),
      contentWidth: contentWidth,
      mobileWidth: mobileWidth,
    }),
    mmmColumn: attributesToString({
      align: align,
      padding: padding,
    })
  };

  const image = wrapAnchor(url, `<img ${attributes.img} />`);

  return parseComponent('mmm-box', {
    'class': 'mmm-image',
    align,
    backgroundColor: '',
    textAlign: align,
    innerHtml: image,
    padding,
    contentWidth: width,
  });

  return parser(`<mmm-row ${attributes.mmmRow}>
      <mmm-column ${attributes.mmmColumn}>
        ${image}
      </mmm-column>
    </mmm-row>`);
};

/**
 * Parse the image tag
 *
 * @param attributes
 * @return string
 */
export const renderX = ({ alt, mobileWidth, padding, src, width, url }, { parser, template }) => {
  template.getStyles().add({
    '@media only screen and (max-width: 999999px)': {
      '.mmm-image img': {
        height: 'auto !important',
        width: '100% !important',
        display: 'block',
      },
    },
  });

  const imageWidth = cssParser(`${width} - (${padding} * 2)`);
  const widthValue = findAndReplaceUnits(imageWidth).value;
  const image = wrapAnchor(url, `<img src="${src}" alt="${alt}" width="${widthValue}" border="0" style="width: 100%; max-width: 100%;" />`);

  return parser(`<mmm-row content-width="${width}" mobile-width="${mobileWidth}" class="mmm-image">
      <mmm-column padding="${padding}">
        ${image}
      </mmm-column>
    </mmm-row>`);
};

/**
 * Wrap with the parent parser
 */
export default wrapper(parser, render);
