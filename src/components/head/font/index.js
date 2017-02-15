
import { resolveProvider } from '../../../fonts';

/**
 * Create the Google Fonts url
 *
 * @param name
 * @param weight
 * @param subset
 * @return string
 */
const getGoogleFontUrl = (name, { weight, subset }) => {
  const parts = [];

  // add the family
  parts.push(name.replace(/ /g, '+'));

  // add the font weights
  parts.push(`:${(weight ? weight  : '200,400')}`);

  if (subset) {
    // add the subset of fonts to load
    parts.push(`&amp;subset=${subset}`);
  }

  return `https://fonts.googleapis.com/css?family=${parts.join('')}`;
};

/**
 * Get the provider font url
 *
 * @param provider
 * @param name
 * @param attributes
 * @returns {string}
 */
const getProviderFont = (provider, name, attributes) => {
  switch (provider) {
    case 'google':
      return getGoogleFontUrl(name, attributes);
    case 'safe':
      return '';
    default:
      // failed to find the provider
      throw `Failed to resolve the font provider!`;
  }
};

/**
 * Parse the fonts
 *
 * @param attributes
 * @returns {{url: string}}
 */
const font = (attributes) => {
  let { url, provider } = attributes;
  const { name } = attributes;

  if (!provider) {
    provider = resolveProvider(name);
  }

  if (!url && !provider) {
    console.warn('<mmm-font> must provide either a url or the provider');
  }

  if (provider) {
    url = getProviderFont(provider, name, attributes);
  }

  return {
    url: url,
  };
};

// xml tag
font.tag = 'mmm-font';

// Not allowed children
font.allowedChildren = [];

export default font;
