
import cssParser, { findAndReplaceUnits } from 'css-math/lib/parser';
import parser from './index';
import wrapper from '../../wrapper';

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

/**
 * Parse the image tag
 *
 * @param attributes
 * @return string
 */
export const render = ({ alt, mobileWidth, padding, src, width, url }, { parser, template }) => {
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
