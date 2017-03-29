
/**
 * Get the element attribute
 *
 * @param element
 * @param name
 * @param defaultValue
 * @return mixed
 */
export const getAttribute = (element, name, defaultValue = undefined) => {
  if (typeof element.attribs === 'undefined' || typeof element.attribs[name] === 'undefined') {
    return defaultValue;
  }

  return element.attribs[name];
};
