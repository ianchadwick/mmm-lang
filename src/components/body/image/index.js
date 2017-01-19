
import { parser } from 'css-math';

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

  return {
    mobileWidth: parser(`${mobileWidth} - (${padding} * 2)`),
    width: parser(`${width} - (${padding} * 2)`),
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

  return Object.assign({
    align: 'center',
    alt: '',
    display: 'block',
    height: 'auto',
    padding: '0px',
    src: '',
    url: '',
    mobileWidth: mobileWidth,
    width: width,
  }, attributes, {
    children,
  });
};

// xml tag
image.tag = 'mmm-image';

// Not allowed children
image.allowedChildren = [];

export default image;
