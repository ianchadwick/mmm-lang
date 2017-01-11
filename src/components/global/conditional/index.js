
import trim from 'lodash/trim';

/**
 * Parse the conditional
 *
 * @param template
 * @param attributes
 * @param children
 */
const conditional = (template, attributes, children) => {
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
