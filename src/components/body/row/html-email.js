
import cssParser, { findAndReplaceUnits } from 'css-math/lib/parser';
import parser  from './index';
import wrapper from '../../wrapper';
import styleHelper from './styleHelper';

const applyBorder = (innerHtml, contentWidth, spacing, spacingWidth, spacingColor, widthHtml) => {
  if (['outside', 'both'].indexOf(spacing) === -1) {
    return innerHtml;
  }

  const spacingWidthValue = findAndReplaceUnits(spacingWidth).value;

  return `<table width="${contentWidth}" cellpadding="0" cellspacing="0" align="center" class="layout-border" style="border-collapse: collapse; margin: 0px; padding: 0px; ${widthHtml}">
        <tr>
          <td valign="top" bgcolor="${spacingColor}" width="${spacingWidthValue}" style="width: ${spacingWidth};">
            <table width="${spacingWidthValue}" cellpadding="0" cellspacing="0">
              <tr>
                <td width="${spacingWidthValue}">
                  <img width="${spacingWidthValue}" height="${spacingWidthValue}" src="https://www.mizmoz.com/img/spacer.gif" />
                </td>
              </tr>
            </table>
          </td>
          <td>
            ${innerHtml}
          </td>
          <td valign="top" bgcolor="${spacingColor}" width="${spacingWidthValue}" style="width: ${spacingWidth};">
            <table width="${spacingWidthValue}" cellpadding="0" cellspacing="0">
              <tr>
                <td width="${spacingWidthValue}">
                  <img width="${spacingWidthValue}" height="${spacingWidthValue}" src="https://www.mizmoz.com/img/spacer.gif" />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`;
};

/**
 * Apply the inside borders
 *
 */
const applyInsideBorder = (innerHtml, key, spacing, spacingWidth, spacingColor, mobileWidth, mobileBreakpoint) => {
  if (['inside', 'both'].indexOf(spacing) === -1 || key === 0) {
    // no inside borders / spacing
    return innerHtml;
  }

  const spacingWidthValue = findAndReplaceUnits(spacingWidth).value;

  const calcWidth = calc(spacingWidth, mobileWidth, mobileBreakpoint);

  return `<td class="column" valign="top" bgcolor="${spacingColor}" width="${spacingWidthValue}" style="width: ${spacingWidth};">
      <![endif]-->
			<div class="column simple-${spacingWidthValue}" style="margin: auto; background: ${spacingColor}; height: ${spacingWidth}; line-height: ${spacingWidth}; max-width: ${mobileWidth}; min-width: ${spacingWidth}; width: 100%; width: ${calcWidth};">&nbsp;</div>
      <!--[if (mso)|(IE)]>
      </td>
      ${innerHtml}
`;
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
    const a = cssParser(`(${desktopWidth} - ${mobileWidth}) * 100`).replace('px', '%');
    const b = cssParser(`(${desktopWidth} - ${mobileWidth}) * ${mobileBreakpoint} - ${desktopWidth}`);
    return `calc(${a} - ${b})`;
  }

  const a = cssParser(`((${mobileWidth} - ${desktopWidth}) * (${mobileBreakpoint} - 1) + ${mobileWidth})`);
  const b = cssParser(`(${mobileWidth} - ${desktopWidth}) * 100`).replace('px', '%');
  return `calc(${a} - ${b})`;
};

/**
 * Get the calculated attributes like calc()
 *
 * @return {*}
 */
export const getCalculatedAttributes = (attributes) => {
  // create the calc widths
  const calcWidth = calc(
    attributes.contentWidth,
    attributes.mobileWidth,
    attributes.mobileBreakpoint
  );

  return Object.assign({}, attributes, {
    calcWidth: calcWidth,
  });
};

/**
 * Render the row
 * <mmm-row
 *  width="100%"
 *  content-width="600px"
 * >...</row>
 *
 * @param attributes
 * @return
 */
export const render = (attributes, { template, dom }) => {
  const {
    calcWidth,
    children,
    contentWidth,
    contentInnerWidth,
    maxWidth,
    mobileBreakpoint,
    mobileWidth,
    mobileSpaceWidth,
    minWidth,
    spacing,
    spacingWidth,
    spacingColor,
    width,
  } = getCalculatedAttributes(attributes);

  const { getElementAttribute } = dom;
  const className = `layout-${contentWidth}`;

  const styleWidths = [
    contentWidth,
  ];

  // get the min width of the table
  const widthHtml = `max-width: ${maxWidth}; min-width: ${minWidth}; width: ${mobileWidth}; width: ${calcWidth};`;
  const tableWidth = findAndReplaceUnits(contentWidth).value;

  const innerHtml = children.map((child, key) => {
    const styleWidth = findAndReplaceUnits(getElementAttribute(child, 'width')).value;
    const background = getElementAttribute(child, 'background', 'transparent');

    // add the width so we can add classes later
    styleWidths.push(getElementAttribute(child, 'width'));

    return applyInsideBorder(`<td class="column" valign="top" width="${styleWidth}" bgcolor="${background}">
            <![endif]-->
              {{children.${child.childrenPosition}}}
            <!--[if (mso)|(IE)]>
            </td>`, key, spacing, spacingWidth, spacingColor, mobileSpaceWidth, mobileBreakpoint);
  });

  const innerContent = applyBorder(`<!--[if (mso)|(IE)]>
        <table class="${className}" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff" width="${tableWidth}">
          <tr>
            ${innerHtml.join('')}
          </tr>
        </table>
      <![endif]-->`, contentWidth, spacing, spacingWidth, spacingColor, widthHtml);

  // add the style widths to the stylesheet
  template.getStyles().addHelper('mmm-row', styleHelper(mobileBreakpoint), [contentWidth]);

  const classes = [
    className,
  ];

  if (typeof attributes.class === 'string') {
    classes.push(attributes.class);
  }

  return `<div class="${classes.join(' ')}" style="background-color: #ffffff; display: table; Margin: 0 auto; ${widthHtml}">
      ${innerContent}
    </div>`;
};

export default wrapper(parser, render);
