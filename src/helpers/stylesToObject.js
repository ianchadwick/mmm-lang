
import camelCase from 'lodash/camelCase';

/**
 * Convert the style tag to an object
 *
 * @param styles
 * @param keyConverter call back function
 * @return {*}
 */
export default (styles, keyConverter = camelCase) => {
  return String(styles).split(';').reduce((all, style) => {
    const parts = style.split(':');

    if (parts.length === 2) {
      const key = keyConverter(String(parts[0]).trim());
      let value = String(parts[1]).trim();

      if (typeof all[key] !== 'undefined') {
        // duplicate keys are made in to arrays of values this is so we can handle
        // hacky styles like multiple widths for different clients etc
        const newValue = (typeof all[key] === 'string' ? [ all[key] ] : all[key]);
        newValue.push(value);
        value = newValue;
      }

      all[key] = value;
    }

    return all;
  }, {});
};
