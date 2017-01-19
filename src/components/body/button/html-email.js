
import cssParser, { findAndReplaceUnits } from 'css-math/lib/parser';
import parser from './index';
import wrapper from '../../wrapper';
import box from '../box/html-email';

/**
 * Parse the button tag
 *
 * @param attributes
 * @return string
 */
export const rounded = (attributes, options) => {
  const {
    align,
    backgroundColor,
    borderRadius,
    color,
    fontFamily,
    fontSize,
    margin,
    padding,
    shadow,
    text,
    url,
    width,
  } = attributes;

  const height = cssParser(`${fontSize} + (${padding} * 2)`);
  const arcsize = `${findAndReplaceUnits(cssParser(`(${borderRadius} / ${height}) * 100`)).value}%`;

  return `<div>
  <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      href="${url}"
      style="height: ${height}; v-text-anchor: middle; width: ${width};" arcsize="${arcsize}"
      strokecolor="${color}" fillcolor="${backgroundColor}">
      <w:anchorlock/>
      <center style="color: ${color}; font-family: sans-serif; font-size: ${fontSize};">${text}</center>
    </v:roundrect>
  <![endif]-->
  <a href="${url}" style="background-color: ${backgroundColor}; border-radius: ${borderRadius}; color: ${color}; display: inline-block; font-family: ${fontFamily}; font-size: ${fontFamily}; padding: ${padding}; text-align:center; text-decoration:none; width:auto; -webkit-text-size-adjust:none; mso-hide:all;">${text}</a>
</div>`;
};

/**
 * Parse the button tag
 *
 * @param attributes
 * @return string
 */
export const render = (attributes, { template, parseComponent }) => {
  const {
    align,
    backgroundColor,
    borderRadius,
    borderBottom,
    boxShadow,
    color,
    fontFamily,
    fontSize,
    margin,
    mobileBreakpoint,
    padding,
    text,
    url,
    width,
  } = attributes;

  template.getStyles().add({
    [`@media screen and (max-width: ${mobileBreakpoint})`]: {
      '.mmm-button': {
        width: '100% !important',
      },
    },
  });

  const paddingValue = findAndReplaceUnits(padding).value;
  const marginValue = findAndReplaceUnits(margin).value;
  const widthValue = (width === 'auto' ? width : findAndReplaceUnits(width).value);

  return parseComponent('mmm-box', {
    'class': 'mmm-button',
    align,
    backgroundColor,
    borderRadius,
    innerHtml: text,
    margin,
    padding,
    width,
    wrapper: (html) => `<a href="${url}" style="color: ${color}; text-decoration: none; box-shadow: ${boxShadow}">${html}</a>`,
  });

  return `<table class="mmm-button" cellpadding="${marginValue}" cellspacing="0" width="100%" style="border-collapse: collapse; margin: 0px; padding: ${padding}; border: 0px; width: 100%;">
  <tr>
    <td align="${align}" style="text-align: ${align}">
      <a href="${url}" style="text-decoration: none; box-shadow: ${boxShadow}">
        <table cellpadding="${paddingValue}" cellspacing="0" align="center" bgcolor="${backgroundColor}" width="${widthValue}"
          style="border-radius: ${borderRadius}; display: inline-table; border-collapse: collapse; margin: 0px; padding: ${padding}; border: 0px; width: ${width}; max-width: ${width};">
          <tr>
            <td style="color: ${color}; font-size: ${fontSize}; text-align: center">
              ${text}
            </td>
          </tr>
        </table>
      </a>
    </td>
  </tr>
</table>`;
};

/**
 * Wrap with the parent parser
 */
export default wrapper(parser, render);
