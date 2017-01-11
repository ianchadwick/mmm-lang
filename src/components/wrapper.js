/**
 * Wrap the method with the base parser
 *
 * @param callback
 * @returns {function(*=, *=, *=)}
 */
export default (base, callback) => {
  const wrappedCallback = (template, attributes, children) => {
    return callback(base(template, attributes, children));
  };

  wrappedCallback.tag = base.tag;
  wrappedCallback.allowedChildren = base.allowedChildren;

  return wrappedCallback;
};
