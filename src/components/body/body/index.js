/**
 * Parse the body
 *
 * @param attributes
 * @param children
 */
const body = (attributes, children) => {
  return Object.assign({
    'backgroundColor': '#ffffff',
    'class': '',
    'padding': '0px',
    'margin': '0px',
  }, attributes, {
    children,
  });
};

// xml tag
body.tag = 'mmm-body';

// Not allowed children
body.allowedChildren = [];

export default body;
