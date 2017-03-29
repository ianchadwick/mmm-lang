
import forEach from 'lodash/forEach';

export const defaultOptions = {
  wrapper: '<style type="text/css">{{style}}</style>',
  helpers: {},
};

export default class Styles {
  constructor (options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
    this.styles = [];
  };

  /**
   * Create the style from the supplied object
   *
   * @param style
   * @return Styles
   */
  add = (style) => {
    this.styles.push(style);
    return this;
  };

  /**
   * Add the helper
   *
   * @param name
   * @param callback
   * @param styles
   * @return Styles
   */
  addHelper = (name, callback, styles = []) => {
    if (typeof this.options.helpers[name] === 'undefined') {
      this.options.helpers[name] = {
        callback,
        styles: [],
      };
    }

    // add the styles to the helper
    this.options.helpers[name].styles = this.options.helpers[name].styles.concat(styles);

    return this;
  };

  /**
   * Get the helper by name
   *
   * @param name
   * @returns {false}
   */
  getHelper = (name) => {
    return (typeof this.options.helpers[name] === 'object' ? this.options.helpers[name] : false);
  };

  /**
   * Flatten the style definition
   *
   * @param style
   * @return string
   */
  flatten = (style, joinWith = ';') => {
    const styles = [];

    forEach(style, (value, key) => {
      if (typeof value === 'object') {
        styles.push(`${key}{${this.flatten(value, ';')}}`);
      } else {
        styles.push(`${key}:${value}`);
      }
    });

    return styles.join(joinWith);
  };

  /**
   * Render the styles
   *
   * @return string
   */
  render = () => {
    const styleSheets = [];

    forEach(this.options.helpers, (helper) => {
      styleSheets.push(helper.callback(helper.styles));
    });

    if (this.styles.length) {
      const processed = this.styles.map(value => this.flatten(value, '')).join('\n');
      styleSheets.push(this.options.wrapper.replace('{{style}}', processed));
    }

    return styleSheets.join('\n');
  };
}
