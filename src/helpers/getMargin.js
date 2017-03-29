
import forEach from 'lodash/forEach';
import { getPaddingBox, parser } from 'css-math';

/**
 * Get the margins from the styles object
 */
export default styles => {
  let box = getPaddingBox('0px');

  forEach(styles, (style, name) => {
    switch (name) {
      case 'margin':
        box = getPaddingBox(style);
        break;
      case 'marginTop':
        box.top = style;
        break;
      case 'marginBottom':
        box.bottom = style;
        break;
      case 'marginLeft':
        box.left = style;
        break;
      case 'marginRight':
        box.right = style;
        break;
      default:
    }
  });

  const height = parser(`${box.top} + ${box.bottom}`);
  const width = parser(`${box.left} + ${box.right}`);

  box.height = (height ? height : '0px');
  box.width = (width ? width : '0px');

  return box;
};
