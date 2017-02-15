
import { getPaddingBox, parser } from 'css-math';

export const defaultAttributes = {
  align: 'center',
  alt: '',
  display: 'block',
  height: 'auto',
  padding: '0px',
  src: '',
  url: '',
  mobileWidth: '',
  width: '',
  contentWidth: '',

  // styling for the alt tag
  color: '',
  fontFamily: '',
  fontSize: '',
};

/**
 * Get the widths
 *
 * @param mobileWidth
 * @param padding
 * @param width
 * @returns {{mobileWidth: *, width: *}}
 */
const getWidth = ({ mobileWidth, padding, width }) => {
  if (! padding) {
    return {
      mobileWidth,
      width,
    };
  }

  // get the padding total width
  const paddingWidth = getPaddingBox(padding).width;

  return {
    mobileWidth: parser(`${mobileWidth} - ${paddingWidth}`),
    width: parser(`${width} - ${paddingWidth}`),
  };
};

/**
 * Parse the image tag
 *
 * @param attributes
 * @param children
 * @param options
 */
const image = (attributes, children, { parentAttributes }) => {
  const { mobileWidth, width } = getWidth(parentAttributes);

  return Object.assign({}, defaultAttributes, {
    mobileWidth: mobileWidth,
    contentWidth: width,
  }, attributes);
};

// xml tag
image.tag = 'mmm-image';

// Not allowed children
image.allowedChildren = [];

export default image;
