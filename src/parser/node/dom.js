
import { jsdom } from 'jsdom';
import Dom from '../dom';
import jQuery from 'jquery';

class JSDom extends Dom {
  /**
   * Init using JSDom
   *
   * @param html
   */
  constructor(html, parsingMode = 'xml') {
    const config = {
      parsingMode,

      /**
       * @todo understand why this stop node exiting when creating a complex fragment
       *
       * @param resource
       * @param callback
       * @returns {*}
       */
      resourceLoader: (resource, callback) => {
        return callback(resource);
      },
    };

    const window = jsdom(html, config).defaultView;

    const $ = jQuery(window);
    super(html, $, window);
  }

  /**
   * Create a document fragment from the html
   *
   * @param html
   * @return document
   */
  getFragment = (html) => new JSDom(html).getRoot().ownerDocument;
}

/**
 * Create the JSDOM instance for the html
 *
 * @param html
 * @return Dom
 */
export default html => new JSDom(html);
