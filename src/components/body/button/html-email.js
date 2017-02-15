
import cssParser, { findAndReplaceUnits } from 'css-math/lib/parser';
import parser from './index';
import wrapper from '../../wrapper';
import attributesToString from '../../../helpers/attributesToString';

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

  const elementAttributes = attributesToString({
    href: url,
    style: {
      color: color,
      textDecoration: 'none',
    }
  });

  return parseComponent('mmm-box', {
    'class': 'mmm-button',
    align,
    backgroundColor,
    boxShadow,
    color,
    fontFamily,
    fontSize,
    borderRadius,
    innerHtml: text,
    textAlign: 'center',
    margin,
    padding,
    width,
    wrapper: (html) => `<a ${elementAttributes}>${html}</a>`,
  });
};

/**
 * Wrap with the parent parser
 */
export default wrapper(parser, render);
