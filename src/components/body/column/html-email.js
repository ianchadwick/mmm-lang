
import { findAndReplaceUnits } from 'css-math/lib/parser';
import parser  from './index';
import wrapper from '../../wrapper';
import styleHelper from '../row/styleHelper';

/**
 * Render the column
 *
 * <mmm-column
 *  width="300px"
 *  padding="10px"
 * >...</mmm-column>
 *
 * @param attributes
 * @return
 */
export const render = ({ backgroundColor, calcWidth, children, maxWidth, minWidth, mobileBreakpoint, mobileWidth, padding, width }, { template }) => {
  const paddingValue = findAndReplaceUnits(padding).value;

  // add the style width to the stylesheet
  template.getStyles().addHelper('mmm-row', styleHelper(mobileBreakpoint), [width]);

  return `<div class="column layout-${width}" style="background-color: ${backgroundColor}; vertical-align: top; font-family: sans-serif; min-width: ${minWidth}; max-width: ${maxWidth}; width: ${mobileWidth}; width: ${calcWidth};">
               <table width="100%" cellpadding="${paddingValue}" cellspacing="0" style="border-collapse: collapse; margin: 0px; padding: ${padding}; border: 0px; mso-padding-alt: ${padding};">
                 <tbody>
                   <tr>
                     <td width="100%" style="padding: ${padding};">
                      {{children}}
                     </td>
                   </tr>
                 </tbody>
               </table>
             </div>`;
};

export default wrapper(parser, render);
