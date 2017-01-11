
import { fraction, max, min, parser } from 'css-math';
import get from 'lodash/get';

/**
 * Get the columns from the supplied children. This essentially discards any non tag node.
 *
 * @param children
 */
const getColumns = (children) => {
  return children.filter((child, key) => {
    child.childrenPosition = key;
    return (child.type === 'tag' && row.allowedChildren.indexOf(child.name) !== -1);
  });
};

export const defaultAttributes = {
  backgroundColor: '',
  centerOnMobile: true,
  contentWidth: '', // style.contentWidth
  spacing: 'none', // [none, inside, outside, both]
  spacingColor: '',
  spacingWidth: '0px',
  width: 'fixed', // [fixed, full]
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
 * Calculate the widths for the columns
 *
 * @param columns
 * @param contentWidth
 * @param mobileWidth
 * @param mobileBreakpoint
 * @return []
 */
const calculateColumnWidths = (columns, contentWidth, mobileWidth, mobileBreakpoint) => {
  const total = columns.length;
  const defaultWidth = fraction(`1 / ${total}`, contentWidth);

  return columns.map((column) => {
    // set the width
    let columnWidth = get(column, ['attribs', 'width']);

    if (columnWidth && columnWidth.search(/[0-9\.]*\/[0-9\.]*/i) !== -1) {
      columnWidth = fraction(columnWidth, contentWidth);
    }

    const desktopWidth = columnWidth || defaultWidth;
    const minWidth = min([mobileWidth, desktopWidth]);

    column.attribs.width = desktopWidth;
    column.attribs.minWidth = minWidth;
    column.attribs.maxWidth = max([mobileWidth, desktopWidth]);
    column.attribs.mobileWidth = mobileWidth;
    column.attribs.calcWidth = calc(desktopWidth, mobileWidth, mobileBreakpoint);

    return column;
  });
};

/**
 * Calculate the total spacing for the columns
 *
 * @param columnCount
 * @param spacing
 * @param spacingWidth
 * @return string
 */
export const calculateSpacing = (columnCount, spacing, spacingWidth) => {
  if (! spacingWidth || spacingWidth === '0px') {
    return 0;
  }

  switch (spacing) {
    case 'inside':
      return parser(`${columnCount - 1} * ${spacingWidth}`);
    case 'outside':
      return parser(`2 * ${spacingWidth}`);
    case 'both':
      return parser(`${columnCount + 1} * ${spacingWidth}`);
    default:
      return 0;
  }
};

/**
 * Get the content width
 *
 * @param contentWidth
 * @param columnCount
 * @param spacing
 * @param spacingWidth
 * @returns {*}
 */
export const getContentWidth = ({ contentWidth, columns, spacing, spacingWidth }) => {
  const totalSpacing = calculateSpacing(columns, spacing, spacingWidth);
  return parser(`${contentWidth} - ${totalSpacing}`);
};

export const getContentInnerWidth = ({ contentWidth, columns, spacing, spacingWidth }) => {
  if (['outside', 'both'].indexOf(spacing) === -1) {
    contentWidth;
  }

  // force outside to calculate the total inside width
  const totalSpacing = calculateSpacing(columns, 'outside', spacingWidth);
  return parser(`${contentWidth} - ${totalSpacing}`);
};

/**
 * Get the mobile width
 *
 * @param template
 * @param columnCount
 * @param spacing
 * @param spacingWidth
 * @returns {*}
 */
export const getMobileWidth = ({ mobileWidth, columns, spacing, spacingWidth }) => {
  if (['outside', 'both'].indexOf(spacing) === -1) {
    return mobileWidth;
  }

  if (spacing === 'both') {
    columns = 1;
  }

  const totalSpacing = calculateSpacing(columns, spacing, spacingWidth);
  return parser(`${mobileWidth} - ${totalSpacing}`);
};

/**
 * Create the calc width
 *
 * @param desktopWidth
 * @param mobileWidth
 * @param mobileBreakpoint
 * @return string
 */
const calc = (desktopWidth, mobileWidth, mobileBreakpoint) => {
  if (desktopWidth > mobileWidth) {
    const a = parser(`(${desktopWidth} - ${mobileWidth}) * 100`).replace('px', '%');
    const b = parser(`(${desktopWidth} - ${mobileWidth}) * ${mobileBreakpoint} - ${desktopWidth}`);
    return `calc(${a} - ${b})`;
  }

  const a = parser(`((${mobileWidth} - ${desktopWidth}) * (${mobileBreakpoint} - 1) + ${mobileWidth})`);
  const b = parser(`(${mobileWidth} - ${desktopWidth}) * 100`).replace('px', '%');
  return `calc(${a} - ${b})`;
};

/**
 * Parse the item
 *
 * @param template
 * @param attributes
 * @param children
 */
const row = (template, attributes, children) => {
  const columns = getColumns(children);
  const rowAttributes = Object.assign({}, getDefaultAttributes({
    columns: columns.length,
    contentWidth: template.getVariable('style.contentWidth', '600px'),
    maxWidth: template.getVariable('style.contentWidth', '600px'),
    mobileWidth: template.getVariable('style.mobileWidth', '320px'),
    mobileBreakpoint: template.getVariable('style.breakpoint.mobile', '620px'),
  }), attributes);

  const contentWidth = getContentWidth(rowAttributes);
  const contentInnerWidth = getContentInnerWidth(rowAttributes);
  const mobileWidth = getMobileWidth(rowAttributes);

  const childrenWithWidths = calculateColumnWidths(
    columns,
    contentWidth,
    mobileWidth,
    rowAttributes.mobileBreakpoint,
  );

  // get the minWidth
  const minWidth = childrenWithWidths.reduce((min, child) => {
    return (min > child.attribs.width ? child.attribs.width : min);
  }, contentWidth);

  // create the calc widths
  const calcWidth = calc(
    rowAttributes.contentWidth,
    rowAttributes.mobileWidth,
    rowAttributes.mobileBreakpoint
  );

  return Object.assign({}, rowAttributes, {
    calcWidth: calcWidth,
    children: childrenWithWidths,
    contentInnerWidth: contentInnerWidth,
    minWidth: min([rowAttributes.contentWidth, rowAttributes.mobileWidth]),
    mobileSpaceWidth: mobileWidth,
  });
};

// xml tag
row.tag = 'mmm-row';

// Not allowed children
row.allowedChildren = [
  'mmm-column',
];

export default row;
