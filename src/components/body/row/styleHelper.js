
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';

/**
 * Get the class name for the width
 *
 * @param className
 * @param prefix
 * @returns {string}
 */
export const getClassName = (className, prefix = 'layout') => {
  const sanitisedClassName = className.replace('%', '')
    .replace('.', '-');
  return `${prefix}${(prefix ? '-' : '')}${sanitisedClassName}`;
};


/**
 * Get the alignment class
 *
 * @param align
 * @returns {string}
 */
export const getAlignmentClassName = (align) => {
  return (align ? `block-align-${align}` : '');
};

/**
 * Herlp for creating the styles needed for the layouts
 *
 * @param styles
 * @param mobileBreakpoint
 * @returns {string}
 */
export const helper = (styles, mobileBreakpoint) => {
  const widths = sortBy(uniq(styles))
    .map((width) => `.${getClassName(width)} { width: ${width} !important }`);
  
  const owaWidths = widths.map((width) => {
    return `[owa] ${width}`;
  });

  return `<style type="text/css">
.block-align-left { margin-right: auto; }
.block-align-right { margin-left: auto; }
.block-align-center { margin-left: auto; margin-right: auto; }
[owa] .column { display: table-cell }
${owaWidths.join('\n')}
@media screen and (min-width: ${mobileBreakpoint}) {
  .column { display: table-cell }
  .layout-border { width: 100% !important }
  ${widths.join('\n  ')}
}
</style>
<!--[if lte mso 11]>
<style type="text/css">
${widths.join('\n')}
</style>
<![endif]-->`;
};

/**
 * Wrapper for the helper
 *
 * @param mobileBreakpoint
 * @returns {function(*=)}
 */
export default (mobileBreakpoint) => {
  return (styles) => helper(styles, mobileBreakpoint);
};
