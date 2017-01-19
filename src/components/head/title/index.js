
import trim from 'lodash/trim';

/**
 * Parse the title
 *
 * @param attributes
 * @param children
 */
const title = (attributes, children) => {
  return {
    title: trim(children[0].data),
  };
};

// xml tag
title.tag = 'mmm-title';

// Not allowed children, anything in the tags will be passed as the first item in the children
title.allowedChildren = false;

export default title;
