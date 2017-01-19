
import parser from './index';
import wrapper from '../../wrapper';

/**
 * Parse the head
 *
 * @param attributes
 * @return string
 */
export const render = ({ children, lang }) => {
  return `<head lang="${lang}">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge" /><!--<![endif]-->
    <meta name="viewport" content="width=device-width" />
    {{children}}
  </head>`;
};

/**
 * Wrap with the parent parser
 */
export default wrapper(parser, render);
