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

  if (weight) {
    // add the font weights
    parts.push(`:${weight}`);
  }

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
    default:
      throw `Unknown font provider: ${provider}`;
  }
};

/**
 * Parse the fonts
 *
 * @param template
 * @param attributes
 * @param children
 */
const font = (template, attributes, children) => {
  const { name, provider, subset, weight } = attributes;
  let url = attributes.url;

  if (!url && !provider) {
    console.log('<mmm-font> must provide either a url or the provider');
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
