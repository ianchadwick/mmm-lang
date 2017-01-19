
import parser from './index';
import wrapper from '../../wrapper';

export const render = () => `<!DOCTYPE html>
<html>
  {{children}}
</html>`;

/**
 * Parse the html tag
 *
 * @param result
 * @return string
 */
export default wrapper(parser, render);
