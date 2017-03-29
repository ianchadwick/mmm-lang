
/**
 * Parse the divider tag
 *
 * @param attributes
 * @param children
 */
const divider = (attributes, children) => {
  return Object.assign({
    color: '#ffffff',
    margin: '0px',
    width: '100%',
    height: '12px',
  }, attributes, {
    children,
  });
};

// xml tag
divider.tag = 'mmm-divider';

// Not allowed children
divider.allowedChildren = [];

export default divider;
