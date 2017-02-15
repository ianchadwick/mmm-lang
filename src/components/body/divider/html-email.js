
import { findAndReplaceUnits } from 'css-math/lib/parser';
import parser from './index';
import wrapper from '../../wrapper';

/**
 * Parse the image tag
 *
 * @param attributes
 * @return string
 */
export const render = (attributes, options) => {
  const {
    color,
    margin,
    width,
    height,
  } = attributes;

  const marginValue = findAndReplaceUnits(margin).value;
  const heightValue = findAndReplaceUnits(height).value;

  return `<table cellpadding="${marginValue}" cellspacing="0" width="100%" style="border-collapse: collapse; margin: 0px; padding: ${margin}; border: 0px; width: 100%;">
    <tr>
      <td style="padding: ${margin}; width: 100%">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; min-width:100%;" bgcolor="${color}">
          <tr>
            <td height="${heightValue}" width="100%" style="font-size: ${height}; line-height: ${height};">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
};

/**
 * Wrap with the parent parser
 */
export default wrapper(parser, render);
