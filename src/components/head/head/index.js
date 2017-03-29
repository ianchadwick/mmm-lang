/**
 * Parse the head
 *
 * @param attributes
 * @param children
 */
const head = ({ lang = 'en' }, children) => {
  return {
    children,
    lang,
  };
};

// xml tag
head.tag = 'mmm-head';

// Not allowed children
head.allowedChildren = [];

export default head;
