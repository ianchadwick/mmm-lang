
import parser from './index';
import wrapper from '../../wrapper';
import { getDropShadow, defaultTableAttributes } from '../../../helpers/style';
import { mapAttributesToString } from '../../../helpers/attributesToString';
import { attributeTag } from '../../../transforms/collapse-margin/html-email';

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
    boxShadow,
    className,
    color,
    fontFamily,
    fontSize,
    innerHtml,
    margin,
    padding,
    textAlign,
    width,
    wrapper,
  } = attributes;

  const elementAttributes = mapAttributesToString({
    table: defaultTableAttributes({
      className: className('mmm-box'),
      padding: margin,
      width: '100%',
      style: {
        minWidth: '100%',
      },
    }),

    td: {
      align: align,
      style: {
        textAlign: align,
        padding: margin,
      }
    },

    tableInner: defaultTableAttributes({
      align: align,
      backgroundColor: backgroundColor,
      padding: padding,
      width: width,
      style: {
        borderRadius: borderRadius,
        boxShadow: getDropShadow(boxShadow),
        display: (width !== '100%' ? 'inline-table' : undefined),
        minWidth: (width === '100%' ? width : undefined),
      },
    }),

    tdInner: {
      align: textAlign,
      [attributeTag]: margin,
      style: {
        color: color,
        fontFamily: fontFamily,
        fontSize: fontSize,
        padding: padding,
        textAlign: textAlign,
      }
    },
  });

  return `<table ${elementAttributes.table}>
            <tr>
              <td ${elementAttributes.td}>
                ${wrapper(`<table ${elementAttributes.tableInner}>
                  <tr>
                    <td ${elementAttributes.tdInner}>${innerHtml}</td>
                  </tr>
                </table>`)}
              </td>
            </tr>
          </table>`;
};

/**
 * Wrap with the parent parser
 */
export default wrapper(parser, render);
