
import { findAndReplaceUnits } from 'css-math/lib/parser';
import parser from './index';
import wrapper from '../../wrapper';

/**
 * Get the table style
 *
 * @param styles
 * @returns {*}
 */
const getTableStyle = (styles) => {
  return Object.assign({
    'border-collapse': 'collapse',
    'margin': 0,
    'border': 0,
  }, styles);
};

/**
 * Parse the image tag
 *
 * @param attributes
 * @return string
 */
export const render = (attributes, { template }) => {
  const {
    align,
    backgroundColor,
    borderRadius,
    className,
    innerHtml,
    margin,
    padding,
    width,
    wrapper,
  } = attributes;

  const styles = template.getStyles();
  const paddingValue = findAndReplaceUnits(padding).value;
  const marginValue = findAndReplaceUnits(margin).value;
  const widthValue = (width.search('%') !== -1 ? width : findAndReplaceUnits(width).value);

  const style = {
    table: getTableStyle({
      'width': '100%',
      'min-width': '100%',
      'padding': margin,
    }),
    td: {
      'text-align': align,
      'padding': margin,
    },
    tableInner: getTableStyle({
      'width': width,
      'padding': padding,
      'border-radius': borderRadius,
      'background': backgroundColor,
    }),
  };

  if (width === '100%') {
    style.tableInner['min-width'] = '100%';
  } else {
    style.tableInner['display'] = 'inline-table';
  }

  const innerTable = wrapper(`<table cellpadding="${paddingValue}" cellspacing="0" width="${widthValue}" align="${align}"
                bgcolor="${backgroundColor}" style="${styles.flatten(style.tableInner)}">
                  <tr>
                    <td style="padding: ${padding}">${innerHtml}</td>
                  </tr>
                </table>`);

  return `<table data-tag="mmm-box" class="${className('mmm-box')}" cellpadding="${marginValue}" cellspacing="0" width="100%" style="${styles.flatten(style.table)}">
            <tr>
              <td align="${align}" style="${styles.flatten(style.td)}">
                ${innerTable}
              </td>
            </tr>
          </table>`;
};

/**
 * Wrap with the parent parser
 */
export default wrapper(parser, render);
