
import parser from './index';
import wrapper from '../../wrapper';

export const render = ({ url }) => {
  return `<link href="${url}" rel="stylesheet">`;
};

/**
 * Parse the fonts and return the html replacement
 *
 * @param result
 * @return string
 */
export default wrapper(parser, render);
