
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';

export const helper = (styles, mobileBreakpoint) => {
  const widths = sortBy(uniq(styles))
    .map((width) => `.layout-${width} { width: ${width} !important }`);
  
  const owaWidths = widths.map((width) => {
    return `[owa] ${width}`;
  });

  return `<style type="text/css">
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
