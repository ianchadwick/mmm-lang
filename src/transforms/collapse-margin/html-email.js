
import forEach from 'lodash/forEach';
import omit from 'lodash/omit';
import { getPaddingBox, max, min, parser } from 'css-math';
import { findAndReplaceUnits } from 'css-math/lib/parser';

import stylesToObject from '../../helpers/stylesToObject';
import stylesToString from '../../helpers/stylesToString';
import getMargin from '../../helpers/getMargin';

export const attributeName = 'data-collapse-margin';

export const attributeTag = 'dataCollapseMargin';

/**
 * Get the node margin
 *
 * @param node
 */
const getNodeMargin = (node) =>
  getMargin(
    stylesToObject(node.getAttribute('style'))
  );

/**
 * Set the node margin from the object
 *
 * @param node
 * @param margin
 */
const setNodeMargin = (node, margin) => {
  const style = stylesToObject(node.getAttribute('style'));

  // remove all margins from the style as we're about to overwrite them all
  const styles = omit(style, [
    'margin',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
  ]);

  if ((margin.top && margin.top !== '0px')
    || (margin.right && margin.right !== '0px')
    || (margin.bottom && margin.bottom !== '0px')
    || (margin.left && margin.left !== '0px')) {
    // add the margin
    styles.margin = `${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`;
  }

  // create the new style string
  const newStyle = stylesToString(styles);

  if (newStyle.trim()) {
    // update the style
    node.setAttribute('style', newStyle);
    return;
  }

  // unset the style attribute
  node.removeAttribute('style');
};

/**
 * Check the nodes margins against the provided parent box
 *
 * @param node
 * @param box
 * @param margin
 */
const checkNodeMargin = (node, box, margin) => {
  const nodeMargin = getNodeMargin(node);

  if (nodeMargin[margin] && ['0px', '0'].indexOf(nodeMargin[margin]) === -1) {
    if (nodeMargin[margin] === box[margin]) {
      // remove the margin from the child
      nodeMargin[margin] = '0px';

      // set the child margins
      setNodeMargin(node, nodeMargin);
    } else {
      // find the maximum margin value
      const maxMargin = max([
        box[margin],
        nodeMargin[margin],
      ]);

      const minMargin = min([
        box[margin],
        nodeMargin[margin],
      ]);

      // find the difference so we can set the child margin to this
      nodeMargin[margin] = parser(`${maxMargin} - ${minMargin}`);

      // set the child margins
      setNodeMargin(node, nodeMargin);
    }
  }
};

/**
 * Collapse the margins at the end of a text area
 *
 * @param getDom
 * @param html
 * @return string
 */
export default ({ getDom, html }) => {
  const dom = getDom(html);
  const nodes = [].slice.call(dom.querySelectorAll(`*[${attributeName}]`));
  
  // loop through all the nodes with the data-collapse-margin attribute
  forEach(nodes, (node) => {
    const margin = node.getAttribute(attributeName);

    // remove the attribute
    node.removeAttribute(attributeName);
    
    if (!node.children.length) {
      // there are no children, nothing to do
      return;
    }

    // get the margin box
    const box = getPaddingBox(margin);

    const top = findAndReplaceUnits(box.top);
    const bottom = findAndReplaceUnits(box.bottom);

    if (top.value) {
      // we have a top margin, check the first child for a top margin
      checkNodeMargin(node.children[0], box, 'top');
    }

    if (bottom.value) {
      // we have a bottom margin, check the last child for a bottom margin
      checkNodeMargin(node.children[node.children.length - 1], box, 'bottom');
    }
  });

  return dom.documentElement.outerHTML;
};
