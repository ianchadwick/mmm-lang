
import Variables from './variables';

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