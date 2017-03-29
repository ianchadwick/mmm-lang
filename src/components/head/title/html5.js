
import parser from './index';
import wrapper from '../../wrapper';

export const render = ({ title }) => {
  return `<title>${title}</title>`;
};

/**
 * Parse the title and return the html replacement
 *
 * @param result
 * @return string
 */
export default wrapper(parser, render);
