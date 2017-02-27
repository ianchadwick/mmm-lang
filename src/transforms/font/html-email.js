
import forEach from 'lodash/forEach';
import kebabCase from 'lodash/kebabCase';
import { getFontForCSS, isSafe } from '../../fonts';
import stylesToObject from '../../helpers/stylesToObject';
import stylesToString from '../../helpers/stylesToString';

/**
 * Transform standard font tags to tags with fall backs
 *
 * @param getDom
 * @param html
 * @return string
 */
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
    const stylesheet = dom.createComment(`[if mso]><style>${styleString}</style><![endif]`);
    dom.querySelector('head').appendChild(stylesheet);
  }

  return dom.documentElement.outerHTML;
}
