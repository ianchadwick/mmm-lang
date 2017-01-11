
import trim from 'lodash/trim';

/**
 * Parse the title
 *
 * @param template
 * @param attributes
 * @param children
 */
const title = (template, attributes, children) => {
  return {
    title: trim(children[0].data),
  };
};

// xml tag
title.tag = 'mmm-title';

// Not allowed children
title.allowedChildren = [];

export default title;
