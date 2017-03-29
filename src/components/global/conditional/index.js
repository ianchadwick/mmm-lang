
/**
 * Parse the conditional
 *
 * @param attributes
 * @param children
 */
const conditional = (attributes, children) => {
  return {
    query: attributes.query,
    children: children,
  };
};

// xml tag
conditional.tag = 'mmm-conditional';

// Not allowed children
conditional.allowedChildren = [];

export default conditional;
