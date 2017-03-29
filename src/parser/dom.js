
import camelCase from 'lodash/camelCase';
import forEach from 'lodash/forEach';
import mapValues from 'lodash/mapValues';
import toArray from 'lodash/toArray';

export default class Dom {
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
