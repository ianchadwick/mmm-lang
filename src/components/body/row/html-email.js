
import cssParser, { findAndReplaceUnits } from 'css-math/lib/parser';
import parser  from './index';
import wrapper from '../../wrapper';
import { getAttribute } from '../../../helpers/element';

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
export const render = (attributes) => {
  const {
    calcWidth,
    children,
    contentWidth,
    contentInnerWidth,
    mobileBreakpoint,
    mobileWidth,
    mobileSpaceWidth,
    minWidth,
    spacing,
    spacingWidth,
    spacingColor,
    width,
  } = getCalculatedAttributes(attributes);

  // get the min width of the table
  const widthHtml = `max-width: ${contentWidth}; min-width: ${minWidth}; width: ${mobileWidth}; width: ${calcWidth};`;
  const tableWidth = findAndReplaceUnits(contentInnerWidth).value;

  const innerHtml = children.map((child, key) => {
    const styleWidth = findAndReplaceUnits(getAttribute(child, 'width')).value;
    const background = getAttribute(child, 'background', 'transparent');

    return applyInsideBorder(`<td class="column" valign="top" width="${styleWidth}" bgcolor="${background}">
            <![endif]-->
              {{children.${child.childrenPosition}}}
            <!--[if (mso)|(IE)]>
            </td>`, key, spacing, spacingWidth, spacingColor, mobileSpaceWidth, mobileBreakpoint);
  });

  const innerContent = applyBorder(`<!--[if (mso)|(IE)]>
        <table class="layout" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff" width="${tableWidth}">
          <tr>
            ${innerHtml.join('')}
          </tr>
        </table>
      <![endif]-->`, contentWidth, spacing, spacingWidth, spacingColor, widthHtml);

  return `<div class="layout" style="background-color: #ffffff; display: table; Margin: 0 auto; ${widthHtml}">
      ${innerContent}
    </div>`;
};

export default wrapper(parser, render);


/*
<div class="layout" style="background-color: #ffffff; display: table; Margin: 0 auto; max-width: 600px; min-width: 320px; width: 320px; width: calc(28000% - 173000px);">
  <!--[if (mso)|(IE)]>
  <table class="layout" cellpadding="0" cellspacing="0" align="center" bgcolor="#ffffff">
    <tr>
      <td class="column" valign="top" style="width: 300px; background: red">
        <![endif]-->
        <div class="column" style="background-color: red; vertical-align: top; font-family: sans-serif; min-width: 300px; max-width: 320px; width: 320px; width: calc(12300px - 2000%);">
          <table width="100%" cellpadding="15" cellspacing="0" style="border-collapse: collapse; margin: 0px; padding: 15px; border: 0px;">
            <tbody>
            <tr>
              <td width="100%" style="padding: 15px">
                Simple with a background color, 15px padding, no border
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <!--[if (mso)|(IE)]>
      </td>
      <td class="column" valign="top" style="width: 300px; background: green;">
        <![endif]-->
        <div class="column" style="background-color: green; vertical-align: top; font-family: sans-serif; min-width: 300px; max-width: 320px; width: 320px; width: calc(12300px - 2000%);">
          <table width="100%" cellpadding="15" cellspacing="0" style="border-collapse: collapse; margin: 0px; padding: 15px; border: 0px;">
            <tbody>
            <tr>
              <td width="100%" style="padding: 15px">
                Simple with a background color, 15px padding, no border
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--[if (mso)|(IE)]>
      </td>
    </tr>
  </table>
  <![endif]-->
</div>
*/