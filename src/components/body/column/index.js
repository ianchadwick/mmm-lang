
export const defaultAttributes = {
  backgroundColor: '',
  centerOnMobile: true,
  width: '100%',
  padding: '0px',
};

/**
 * Get the default attributes
 *
 * @param attributes
 * @return {*}
 */
export const getDefaultAttributes = (attributes = {}) =>
  Object.assign({}, defaultAttributes, attributes);

/**
 * Parse the item
 *
 * @param template
 * @param attributes
 * @param children
 */
const column = (template, attributes, children) => {
  return Object.assign({}, getDefaultAttributes(), attributes);
};

// xml tag
column.tag = 'mmm-column';

// Any children
column.allowedChildren = [];

export default column;
