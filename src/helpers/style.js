
import { findAndReplaceUnits } from 'css-math/lib/parser';

/**
 * Get the button drop shadow
 *
 * @param shadow
 * @returns {string}
 */
export const getDropShadow = (shadow) => {
  switch (shadow) {
    case 'subtle':
      return 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px';
    case 'dark':
      return 'rgba(0, 0, 0, 0.3) 0px 3px 6px, rgba(0, 0, 0, 0.3) 0px 1px 5px';
    default:
      return shadow;
  }
};

/**
 * Get the default table attributes
 *
 * @param align
 * @param backgroundColor
 * @param width
 * @param style
 * @returns {{align: *, bgcolor: *, cellpadding: string, cellspacing: string, width: *, style: *}}
 */
export const defaultTableAttributes = ({ align, backgroundColor, className, padding, width = '100%', style }) => {
  const widthValue = (width.search('%') !== -1 ? width : findAndReplaceUnits(width).value);
  const paddingValue = (padding ? padding : 0);

  return {
    align: align,
    bgcolor: backgroundColor,
    'class': className,
    cellpadding: '0',
    cellspacing: '0',
    width: widthValue,
    style: Object.assign({}, {
      border: 0,
      borderCollapse: 'collapse',
      margin: 0,
      msoPaddingAlt: paddingValue,
      padding: paddingValue,
      tableLayout: 'fixed',
      width: width,
    }, style),
  };
};
