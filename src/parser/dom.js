
// import cheerio from 'cheerio';
// import { jsdom } from 'jsdom';
import jQuery from 'jquery';

import camelCase from 'lodash/camelCase';
import forEach from 'lodash/forEach';
import mapValues from 'lodash/mapValues';
import toArray from 'lodash/toArray';

class Dom {
  /**
   * Init with the html, jQuery object and window
   *
   * @param html
   * @param $jQuery
   * @param window
   */
  constructor(html, $jQuery, window) {
    this.html = html;
    this.jQuery = $jQuery;
    this.window = window;
  }

  /**
   * Get the original html
   *
   * @return string
   */
  getOriginalHtml = () => this.html;

  /**
   * Get the html of the parsed document
   *
   * @return string
   */
  getHtml = () => this.window.document.documentElement.outerHTML;

  /**
   * Get the root element from the html
   *
   * @return Element
   */
  getRoot = () => this.getJquery()(this.getOriginalHtml())[0];

  /**
   * Get the jquery object
   *
   * @return jQuery
   */
  getJquery = () => this.jQuery;

  /**
   * Get the window object
   *
   * @return Window
   */
  getWindow = () => this.window;

  /**
   * Get the document
   *
   * @return Document
   */
  getDocument = () => this.window.document;

  /**
   * Get the elements details
   *
   * @param element
   * @param decorators Apply a decorator to the attributes before returning
   * @returns {{attributes, tagName: (*|string), children}}
   */
  getElementDetails = (element, decorators = {}) => {
    const details = {
      attributes: this.getElementAttributes(element),
      tagName: this.getElementTagName(element),
      children: this.getElementChildren(element),
    };

    return mapValues(details, (value, name) => (
      typeof decorators[name] === 'function' ? decorators[name](details) : value
    ));
  };

  /**
   * Get the element tag name
   *
   * @param element
   * @return string
   */
  getElementTagName = (element) => (
    typeof element.tagName === 'string' ? element.tagName.toLowerCase() : ''
  );

  /**
   * Get the element children or innerHTML if there are no children
   *
   * @param element
   * @returns {[*]}
   */
  getElementChildren = (element) => toArray(element.childNodes);

  /**
   * Get the elements attributes
   *
   * @param element
   * @param normalise Normalise the attribute names from spacing-width to spacingWidth
   * @return {{*}}
   */
  getElementAttributes = (element) => {
    return this.normaliseAttributes(element.attributes);
  };

  /**
   * Get the element attribute
   *
   * @param element
   * @param name
   * @param defaultValue
   * @return mixed
   */
  getElementAttribute = (element, name, defaultValue = undefined) => {
    const value = element.getAttribute(name);
    return (value === undefined ? defaultValue : value);
  };

  /**
   * Normalise the attributes
   *
   * @param attributes
   * @returns {{className: (function(*=))}}
   */
  normaliseAttributes = (attributes) => {
    const normalisedAttributes = {
      className: (classNames = []) => {
        const classes = (typeof classNames === 'string' ? classNames.split(' ') : classNames);
        const classAttributes = (typeof normalisedAttributes.class === 'string'
          ? normalisedAttributes.class.split(' ') : []
        );

        return classes.concat(classAttributes).join(' ');
      },
    };

    forEach(attributes, (attr, key) => {
      if (typeof attr.nodeName === 'undefined') {
        // attributes are not nodes
        normalisedAttributes[key] = attr;
      } else {
        const name = camelCase(attr.nodeName);
        normalisedAttributes[name] = attr.nodeValue;
      }
    });

    return normalisedAttributes;
  }
}

class JQuery extends Dom {
  constructor(html) {
    super(html, jQuery, window);
  }
}

class JSDom extends Dom {
  /**
   * Init using JSDom
   *
   * @param html
   */
  constructor(html) {
    const config = {
      parsingMode: 'xml',
    };

    const window = jsdom(html, config).defaultView;
    const $ = jQuery(window);

    super(html, $, window);
  }
}

class Cheerio extends Dom {
  constructor(html) {
    super();

    this.$ = cheerio.load(html, {
      decodeEntities: false,
      normalizeWhitespace: true,
      withStartIndices: true,
      xmlMode: true,
    });
  }

  /**
   * Return the node in a normalised state
   *
   * @param key
   * @param node
   * @returns {{}}
   */
  normaliseNode = (node) => {
    const { attribs, children, name, parent, type } = node;

    return {
      attributes: attribs,
      children: this.normalise(children),
      name: name,
      parent: parent,
      type: type,
    };
  };

  /**
   * Normalise the result set
   *
   * @param result
   */
  normalise = (result) => {
    const nodes = [];

    if (result) {
      const method = (typeof result.each === 'function' ? 'each' : 'forEach');

      result[method]((k, v) => {
        nodes.push(this.normaliseNode(v));
      });
    }

    return nodes;
  };

  /**
   * Search using the css selector
   *
   * @param selector
   * @returns {Cheerio}
   */
  find(selector) {
    return this.normalise(this.$(selector));
  }
}


// export default (html) =>
//   (typeof window === 'undefined' ? new Cheerio(html) : new jQuery(html));
/** @todo Remove once using jQuery with JSDOM is implemented
export default (html) => {
  if (typeof window === 'undefined') {
    // node
    return cheerio.load(html, {
      decodeEntities: false,
      normalizeWhitespace: false,
      withStartIndices: true,
      xmlMode: true,
    });
  }

  return jQuery(html);
};
*/

/**
 * Create the jQuery instance for the html
 *
 * @param html
 * @return Dom
 */
export default (html) =>  (typeof window === 'undefined' ? new JSDom(html) : new JQuery(html));