
import { styles as defaultStyles } from '../../../config';

/**
 * Parse the button tag
 *
 * @param attributes
 * @param children
 * @param options
 */
const button = (attributes, children, { template }) => {
  const { getVariable } = template;

  return Object.assign('mmm-button', {
    align: 'center',
    backgroundColor: '#5db734',
    borderBottom: 'none',
    borderRadius: '3px',
    boxShadow: 'none',
    color: '#ffffff',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    margin: '0px',
    mobileBreakpoint: getVariable('style.breakpoint.mobile', defaultStyles.mobileBreakpoint),
    padding: '12px',
    text: 'Click me',
    url: '',
    width: 'auto',
  }, attributes, {
    children,
  });
};

// xml tag
button.tag = 'mmm-button';

// Not allowed children
button.allowedChildren = [];

export default button;
