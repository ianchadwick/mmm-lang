
import { fraction, max, min, parser } from 'css-math';
import forEach from 'lodash/forEach';
import { styles as defaultStyles } from '../../../config';

/**
 * Get the columns from the supplied children. This essentially discards any non tag node.
 *
 * @param children
 */
const getColumns = (children) => {
  return children.filter((child, key) => {
    child.childrenPosition = key;
    const tagName = String(child.tagName).toLowerCase();
    return (row.allowedChildren.indexOf(tagName) !== -1);
  });
};

export const defaultAttributes = {
  backgroundColor: '',
  backgroundImage: '',
  centerOnMobile: true,
  contentWidth: '', // style.contentWidth
  padding: '0px',
  spacing: 'none', // [none, inside, outside, both]
  spacingColor: '',
  spacingWidth: '0px',
  fullWidth: false,
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
 * Is the value a fraction or percentage?
 *
 * @param value
 * @return boolean
 */
const isFraction = (value) => {
  if (!value || typeof value !== 'string') {
    return false;
  }

  if (value.search(/[0-9\.]*\/[0-9\.]*/i) !== -1) {
    // value is 1/5 type fraction
    return true;
  }

  if (value.search(/%$/) !== -1) {
    // value is a percent
    return true;
  }

  return false;
};

/**
 * Calculate the widths for the columns
 *
 * @param columns
 * @param contentWidth
 * @param mobileWidth
 * @param mobileBreakpoint
 * @param padding
 * @return []
 */
const calculateColumns = (columns, contentWidth, mobileWidth, mobileBreakpoint, padding) => {
  const total = columns.length;
  const defaultWidth = fraction(`1 / ${total}`, contentWidth);

  return columns.map((column) => {
    // get the width
    let columnWidth = column.getAttribute('width');

    if (isFraction(columnWidth)) {
      columnWidth = fraction(columnWidth, contentWidth);
    }

    const desktopWidth = columnWidth || defaultWidth;
    const minWidth = min([mobileWidth, desktopWidth]);
    
    const newAttributes = {
      'width': desktopWidth,
      'min-width': minWidth,
      'max-width': max([mobileWidth, desktopWidth]),
      'mobile-width': mobileWidth,
      'calc-width': calc(desktopWidth, mobileWidth, mobileBreakpoint),
    };

    if (typeof column.getAttribute('padding') === 'undefined') {
      // use the parent padding as none is set on the element
      newAttributes.padding = padding;
    }

    // set the attributes
    forEach(newAttributes, (value, name) => column.setAttribute(name, value));

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

/**
 * Calculate the width of the inner table (width - outside spacing)
 *
 * @param contentWidth
 * @param columns
 * @param spacing
 * @param spacingWidth
 * @returns {*}
 */
export const getContentInnerWidth = ({ contentWidth, columns, spacing, spacingWidth }) => {
  if (['outside', 'both'].indexOf(spacing) === -1) {
    return contentWidth;
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
const row = (attributes, children, { template }) => {
  const columns = getColumns(children);
  const rowAttributes = Object.assign({}, getDefaultAttributes({
    columns: columns.length,
    contentWidth: template.getVariable('style.contentWidth', defaultStyles.contentWidth),
    maxWidth: template.getVariable('style.contentWidth', defaultStyles.contentWidth),
    mobileWidth: template.getVariable('style.mobileWidth', defaultStyles.mobileWidth),
    mobileBreakpoint: template.getVariable('style.breakpoint.mobile', defaultStyles.mobileBreakpoint),
  }), attributes);

  const contentWidth = getContentWidth(rowAttributes);
  const contentInnerWidth = getContentInnerWidth(rowAttributes);
  const mobileWidth = getMobileWidth(rowAttributes);

  const childrenWithWidths = calculateColumns(
    columns,
    contentWidth,
    mobileWidth,
    rowAttributes.mobileBreakpoint,
    rowAttributes.padding
  );

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
    fullWidth: (attributes.fullWidth === 'true' ? true : false),
    maxWidth: max([rowAttributes.contentWidth, rowAttributes.mobileWidth]),
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
