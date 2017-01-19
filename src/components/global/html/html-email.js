
import parser from './index';
import wrapper from '../../wrapper';

export const render = () => `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
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
