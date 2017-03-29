
import parser from './index';
import wrapper from '../../wrapper';

export const render = (attributes) => {
  const className = attributes.class;
  const { style } = attributes;

  return `<body style="${style}" class="${className}">
{{children}}
</body>`;
};

/**
 * Parse the html tag
 *
 * @param result
 * @return string
 */
export default wrapper(parser, render);
