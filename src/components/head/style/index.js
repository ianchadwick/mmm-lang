/**
 * Parse the style
 *
 * @param template
 * @param attributes
 * @param children
 */
const style = (template, attributes, children) => {
  return {
    children,
    lang,
  };
};

// xml tag
style.tag = 'mmm-head';

// Not allowed children
style.allowedChildren = [];

export default style;
