
import parser from './index';
import wrapper from '../../wrapper';

export const render = ({ query }) => {
  return `<!--[if ${query}]>{{children}}<![endif]-->`;
};

/**
 * Parse the conditional and return the html replacement
 *
 * @param result
 * @return string
 */
export default wrapper(parser, render);
