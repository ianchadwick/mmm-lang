
import kebabCase from 'lodash/kebabCase';
import mapValues from 'lodash/mapValues';
import forEach from 'lodash/forEach';
import stylesToString from './stylesToString';

/**
 * Return the value as a string
 *
 * @param value
 * @returns {*}
 */
const valueToString = (value) => {
  switch (typeof value) {
    case 'boolean':
      return String(value);
    default:
      return value;
  }
};

/**
 * Flatten the attributes to a string
 *
 * @param attributes
 * @return string
 */
const attributesToString = (attributes) => {
  const definitions = [];
  
  forEach(attributes, (value, name) => {
    const stringValue = valueToString(value);

    if (stringValue) {
      const val = (name === 'style' ? stylesToString(stringValue) : stringValue);
      definitions.push(`${kebabCase(name)}="${val}"`);
    }
  });
  
  return definitions.join(' ');
};

/**
 * Map all the items in the list
 *
 * @param attributes
 * @return {{*}}
 */
export const mapAttributesToString = (attributes) => mapValues(attributes, attributesToString);

export default attributesToString;
