
/**
 * XML Tag prefix
 *
 * @type {string}
 */
const tagRoot = 'mmm';

/**
 * Main template tags
 *
 * @type {{root: string, head: string, body: string}}
 */
export const tags = {
  root: tagRoot,
  head: `${tagRoot}-head`,
  body: `${tagRoot}-body`,
};

/**
 * CSS selectors for the parts
 *
 * @type {{root: string, head: string, body: string}}
 */
export const selectors = {
  root: tagRoot,
  head: `${tagRoot} > ${tagRoot}-head`,
  body: `${tagRoot} > ${tagRoot}-body`,
};
