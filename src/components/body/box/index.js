
/**
 * Parse the box tag
 *
 * @param attributes
 * @param children
 */
const box = (attributes, children) => {
  return Object.assign({
    align: 'initial',
    backgroundColor: '#ffffff',
    borderRadius: '0',
    margin: '0px',
    padding: '0px',
    width: '100%',
    height: 'auto',

    color: '',
    fontFamily: '',
    fontSize: '',
    textAlign: '',

    // call back allows the wrapping of the inner table
    wrapper: (html) => html,
    innerHtml: '{{children}}',
  }, attributes, {
    children,
  });
};

// xml tag
box.tag = 'mmm-box';

// Not allowed children
box.allowedChildren = [];

export default box;
