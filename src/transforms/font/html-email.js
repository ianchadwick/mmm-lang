
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import { getFontForCSS } from '../../fonts';

/**
 * Transform standard font tags to tags with fall backs
 *
 * @param html
 * @return string
 */
const transform = ({ html }) => {
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

export default transform;
