
import { styles as defaultStyles } from '../../../config';
import getAttributes from '../../../helpers/getAttributes';

export const defaultAttributes = {
  align: '',
  backgroundColor: '',
  centerOnMobile: true,
  width: '100%',
  padding: '0px',
};

/**
 * Parse the item
 *
 * @param attributes
 * @param children
 * @param options
 */
const column = (attributes, children, { parentAttributes, template }) => {
  const { backgroundColor, padding } = parentAttributes;

  const extraAttributes = {
    children,
    mobileBreakpoint: template.getVariable('style.breakpoint.mobile', defaultStyles.mobileBreakpoint),
  };

  return getAttributes(
    defaultAttributes,
    extraAttributes,
    attributes,
    // fallback to parent background color
    { backgroundColor, padding }
  );
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
