
import forEach from 'lodash/forEach';

/**
 * Convert the object to dot notated key => value pair
 *
 * @param variables
 * @param prepend
 * @return {}
 */
const dot = (variables, prepend = '') => {
  let results = {};

  forEach(variables, (value, key) => {
    if (typeof value === 'object' && value.constructor === Object) {
      results = Object.assign({}, results, dot(value, `${prepend}${key}.`));
    } else {
      results[prepend + key] = value;
    }
  });

  return results;
};

export default dot;
