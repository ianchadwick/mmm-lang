
import parser from './index';
import wrapper from '../../wrapper';

/**
 * Doctype is added using the doctype transform
 */
export const render = () => `<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:v="urn:schemas-microsoft-com:vml"
 			xmlns:o="urn:schemas-microsoft-com:office:office">
  {{children}}
</html>`;

/**
 * Parse the html tag
 *
 * @param result
 * @return string
 */
export default wrapper(parser, render);
