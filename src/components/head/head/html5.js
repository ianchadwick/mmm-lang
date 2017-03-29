
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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {{children}}
  </head>`;
};

/**
 * Wrap with the parent parser
 */
export default wrapper(parser, render);
