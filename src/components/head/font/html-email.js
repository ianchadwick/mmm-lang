
import parser from './index';
import wrapper from '../../wrapper';

/**
 * Parse the fonts and return the html replacement
 *
 * @param attributes
 * @return string
 */
export const render = ({ url }) => {
  return (url ? `<!--[if !mso]><!-->
    <style type="text/css">
      @import url("${url}");
    </style>
    <link
      href="${url}"
      rel="stylesheet"
      type="text/css"
    />
    <!--<![endif]-->` : '');
};

/**
 * Wrap with the parent parser
 */
export default wrapper(parser, render);
