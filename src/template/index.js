
import camelCase from 'lodash/camelCase';
import mapValues from 'lodash/mapValues';
import Variables from './variables';
import Styles from './styles';

export default class Template {
  /**
   * Init with the document head and body
   *
   */
  constructor() {
    this.fonts = {};
    this.html = '';
    this.title = '';
    this.variables = new Variables();
    this.styles = new Styles();
  }

  /**
   * Add fonts to the template
   *
   * @param name
   * @param url
   * @param attributes
   * @returns {Template}
   */
  addFont(name, url, attributes = {}) {
    this.fonts[name] = Object.assign({}, { url }, attributes);
    return this;
  }

  /**
   * Add a variable to the template variables
   *
   * @param name
   * @param value
   * @returns {Template}
   */
  addVariable(name, value) {
    this.variables.add(name, value);
    return this;
  }

  /**
   * Get the extra fonts required for the template
   */
  getFonts = () => this.fonts;

  /**
   * Get the html
   *
   * @return string
   */
  getHtml = () => this.html;

  /**
   * Get the title
   *
   * @return string
   */
  getTitle = () => this.title;

  /**
   * Get a variable by it's name
   *
   * @param name
   * @param undefined8
   * @return Variables
   */
  getVariable = (name, defaultValue = undefined) => this.variables.get(name, defaultValue);

  /**
   * Get the variables object
   *
   * @return Variables
   */
  getVariables = () => this.variables;

  /**
   * Get the styles object
   *
   * @return Styles
   */
  getStyles = () => this.styles;

  /**
   * Get the default attributes for the component from the variables
   *
   * @param component
   * @param defaultValues
   * @return {{*}}
   */
  getAttributesForComponent = (component, defaultValues = {}) => {
    if (component) {
      const variables = this.variables.filterByPrefix(`style.${component}`, camelCase);
      return this.resolveObjectValues(Object.assign({}, variables, defaultValues));
    }

    return this.resolveObjectValues(defaultValues);
  };

  /**
   * Resolve the object values
   *
   * @param values
   * @return {{*}}
   */
  resolveObjectValues = (values) => {
    return mapValues(values, (value) => {
      return this.parse(value);
    });
  };

  /**
   * Parse the value for the variables
   *
   * @param value
   * @return string
   */
  parse = (value) => {
    if (typeof value !== 'string') {
      return value;
    }

    // find all the {{variables}} in the template
    const matches = value.split(/((?:%7B|\{){2}[a-z][a-z\.\-0-9]{2,50}(?:%7D|\}){2})/ig);

    return matches.map((match, key) => {
      if (key % 2) {
        const tag = match.replace(/(%7B|%7D|\{|\})/gi, '');
        return this.variables.get(`style.${tag}`, match);
      }

      return match;
    }).join('');
  };

  /**
   * Set the HTML
   *
   * @param html
   * @return Template
   */
  setHtml(html) {
    this.html = html;
    return this;
  }

  /**
   * Set the template title
   *
   * @param title
   * @returns {Template}
   */
  setTitle(title) {
    this.title = title;
    return this;
  }
}