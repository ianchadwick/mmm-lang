
import parser  from './index';
import wrapper from '../../wrapper';
import styleHelper, { getClassName } from '../row/styleHelper';
import attributesToString from '../../../helpers/attributesToString';

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
export const render = ({ align, backgroundColor, calcWidth, children, maxWidth, minWidth, mobileBreakpoint, mobileWidth, padding, width }, { template }) => {
  const className = getClassName(width);

  // add the style width to the stylesheet
  template.getStyles().addHelper('mmm-row', styleHelper(mobileBreakpoint), [width]);

  const attributes = {
    div: attributesToString({
      'class': `column ${className}`,
      style: {
        backgroundColor: backgroundColor,
        verticalAlign: 'top',
        // fontFamily: 'sans-serif',
        minWidth: minWidth,
        maxWidth: maxWidth,
        // use array to add multiple tags with the same name
        width: [
          mobileWidth,
          calcWidth,
        ],
      },
    }),
    table: attributesToString({
      cellpadding: '0',
      cellspacing: '0',
      width: '100%',
      style: {
        border: '0px',
        borderCollapse: 'collapse',
        margin: '0px',
        msoPaddingAlt: padding,
        padding: padding,
      },
    }),
    td: attributesToString({
      align: align,
      width: '100%',
      style: {
        padding: padding,
        textAlign: align,
      },
    }),
  };

  return `<div ${attributes.div}>
             <table ${attributes.table}>
               <tbody>
                 <tr>
                   <td ${attributes.td}>
                    {{children}}
                   </td>
                 </tr>
               </tbody>
             </table>
           </div>`;
};

export default wrapper(parser, render);
