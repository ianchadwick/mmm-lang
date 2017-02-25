
import forEach from 'lodash/forEach';
import kebabCase from 'lodash/kebabCase';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import { getFontForCSS, getFallbackFonts, isSafe } from '../../fonts';
import stylesToObject from '../../helpers/stylesToObject';
import stylesToString from '../../helpers/stylesToString';

/**
 * Transform standard font tags to tags with fall backs
 *
 * @param getDom
 * @param html
 * @return string
 */
const transform = ({ html }) => {
  // find all the tags with the font-family style attribute
  const matches = html.match(/font-family:(.*?)[;"]/gi);

  // filter the matches
  let fonts = matches.reduce((all, match) => {
    const font = match.match(/font-family:\s*(.*?)[;"]/i)[1];

    if (font.search(',') === -1) {
      all.push(font);
    }

    return all;
  }, []);

  if (!fonts.length) {
    return html;
  }

  // make sure we don't duplicate the fonts and sort them by length descending as a really
  // bad way of stopping us replacing partial matches, should fix this at some point
  fonts = uniq(fonts);
  fonts = sortBy(fonts, (font) => font.length).reverse();

  // replace each of the fonts
  return fonts.reduce((template, font) => {
    const replace = getFontForCSS(font);
    const expression = new RegExp(`(font-family:\\s*)${font}([;"])`, 'gi');
    return template.replace(expression, `$1${replace}$2`);
  }, html);
};

export default ({ getDom, html }) => {
  let classes = [];
  const dom = getDom(html);
  const nodes = [].slice.call(dom.querySelectorAll('*[style*="font-family"]'));
  
  // loop through all the nodes and replace the font style with the updated one and add the
  // fall back font class
  forEach(nodes, (node) => {
    const style = stylesToObject(node.getAttribute('style'));
    const fontFamily = style.fontFamily;

    if (fontFamily.search(',') !== -1) {
      // fall backs are already defined so skip
      return;
    }

    // set the font family
    style.fontFamily = getFontForCSS(fontFamily);

    if (!isSafe(fontFamily)) {
      // not a web safe font, we need to add a class fall back for Outlook
      const className = `font-fallback-${kebabCase(fontFamily)}`;

      // add the class name
      node.setAttribute('class', className);

      // add the class to the list
      classes[className] = getFontForCSS(fontFamily, []);
    }

    // set the new styles
    node.setAttribute('style', stylesToString(style));
  });

  if (Object.keys(classes).length) {
    // add the new classes to the head
    let styleString = '';
    for (var key in classes) {
      if (classes.hasOwnProperty(key)) {
        styleString += `.${key}\{font-family:${classes[key]}!important\}`;
      }
    }

    // create the style classes
    const stylesheet = dom.createElement('style');
    stylesheet.innerHTML = `<!--[if mso]>${styleString}<![endif]-->`;
    dom.querySelector('head').appendChild(stylesheet);
  }

  return dom.documentElement.outerHTML;
}
