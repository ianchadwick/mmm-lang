
import { styles as defaultStyles } from '../../../config';

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
 * @param attributes
 * @param children
 * @param options
 */
const column = (attributes, children, { parentAttributes, template }) => {
  const { backgroundColor } = parentAttributes;

  return Object.assign({
    children,
    mobileBreakpoint: template.getVariable('style.breakpoint.mobile', defaultStyles.mobileBreakpoint),
  }, getDefaultAttributes({ backgroundColor }), attributes);
};

// xml tag
column.tag = 'mmm-column';

// Any children
column.allowedChildren = [];

// expose attributes
column.exposeAttributes = [
  'padding',
  'width',
];

export default column;
