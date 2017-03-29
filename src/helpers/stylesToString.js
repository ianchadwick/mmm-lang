
import kebabCase from 'lodash/kebabCase';
import forEach from 'lodash/forEach';

/**
 * Mapping for any keys that need to be changed
 *
 * @type {{margin: string}}
 */
const mapping = {
  margin: 'Margin',
};

/**
 * Get the name
 *
 * @param name
 * @returns {*}
 */
const getName = (name) => {
  if (typeof mapping[name] === 'string') {
    return mapping[name];
  }
  return kebabCase(name);
};

/**
 * Flatten the styles to a string
 *
 * @param styles
 * @return string
 */
export default (styles) => {
  const definitions = [];

  if (typeof styles === 'string') {
    // probably already processed
    return styles;
  }

  forEach(styles, (value, key) => {
    if (value !== undefined && value !== '' && value !== null) {
      const name = getName(key);

      if (typeof value === 'object' && value.constructor === Array) {
        // value is an array, this allows us to have multiple attributes with the same name.
        // we can thank Microsoft and Google for this stupidity!
        forEach(value, (val) => {
          definitions.push(`${name}:${val}`);
        });
      } else {
        definitions.push(`${name}:${value}`);
      }
    }
  });

  return definitions.join(';');
};
