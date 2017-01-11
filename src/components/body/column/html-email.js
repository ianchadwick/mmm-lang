
import { findAndReplaceUnits } from 'css-math/lib/parser';
import parser  from './index';
import wrapper from '../../wrapper';

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
export const render = ({ calcWidth, children, maxWidth, minWidth, mobileWidth, padding, width }) => {
  const paddingParsed = findAndReplaceUnits(padding);
  const widthParsed = findAndReplaceUnits(width);

  return `<div class="column simple-${widthParsed.value}" style="background-color: red; vertical-align: top; font-family: sans-serif; min-width: ${minWidth}; max-width: ${maxWidth}; width: ${mobileWidth}; width: ${calcWidth};">
               <table width="100%" cellpadding="${paddingParsed.value}" cellspacing="0" style="border-collapse: collapse; margin: 0px; padding: ${padding}; border: 0px; mso-padding-alt: ${padding};">
                 <tbody>
                   <tr>
                     <td width="100%" style="padding: ${padding}">
                      {{children}}
                     </td>
                   </tr>
                 </tbody>
               </table>
             </div>`;
};

export default wrapper(parser, render);

/*
<div class="column simple-285" style="background-color: red; vertical-align: top; font-family: sans-serif; min-width: 285px; max-width: 300px; width: 300px; width: calc(9285px - 1500%);">
 <!-- Padding is required as cellpadding, table style padding and also td padding (for Yahoo) -->
 <table width="100%" cellpadding="15" cellspacing="0" style="border-collapse: collapse; margin: 0px; padding: 15px; border: 0px; mso-padding-alt: 15px 15px 15px 15px;">
   <tbody>
     <tr>
       <td width="100%" style="padding: 15px">
        Simple with a background color, 15px padding, no border
       </td>
     </tr>
   </tbody>
 </table>
</div>
*/