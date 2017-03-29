
import jQuery from 'jquery';
import Dom from '../dom';

class JQuery extends Dom {
  constructor(html) {
    super(html, jQuery, window);
  }

  /**
   * Create a document fragment from the html
   *
   * @param html
   * @return document
   */
  getFragment = (html) => (new DOMParser()).parseFromString(html, "text/html");
}

/**
 * Create the JQuery instance for the html
 *
 * @param html
 * @return Dom
 */
export default html => new JQuery(html);
