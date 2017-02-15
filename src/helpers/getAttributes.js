
import uniq from 'lodash/uniq';

/**
 * Get the attributes
 *
 * @param defaultAttributes
 * @param attributes
 * @return {*}
 */
export default (defaultAttributes, ...attributes) => {
  // get all the keys
  let keys = Object.keys(defaultAttributes);
  for (let i = 0; i < attributes.length; i += 1) {
    keys = keys.concat(Object.keys(attributes[i]));
  }

  keys = uniq(keys);

  const combinedAttributes = {};
  for (let i = 0; i < keys.length; i += 1) {
    const name = keys[i];

    // use the default to start with
    combinedAttributes[name] = defaultAttributes[name];

    for (let a = 0; a < attributes.length; a += 1) {
      if (typeof attributes[a][name] !== 'undefined' && attributes[a][name] !== 'undefined') {
        combinedAttributes[name] = attributes[a][name];
        break;
      }
    }
  }

  return combinedAttributes;
};
