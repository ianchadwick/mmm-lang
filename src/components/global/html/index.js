/**
 * Parse the html
 *
 * @param attributes
 * @param children
 */
const html = (attributes, children) => {
  return {
    children,
  };
};

// xml tag
html.tag = 'mmm';

// Not allowed children
html.allowedChildren = [];

export default html;
