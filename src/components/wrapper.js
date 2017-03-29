
/**
 * Wrap the method with the base parser
 *
 * @param callback
 * @returns {function(*=, *=, *=)}
 */
export default (base, callback) => {
  const wrappedCallback = (attributes, children, options = {}) => {
    // parse the component
    const parsed = base(attributes, children, options);

    // create the view
    return callback(parsed, options);
  };

  wrappedCallback.tag = base.tag;
  wrappedCallback.allowedChildren = base.allowedChildren;

  return wrappedCallback;
};
