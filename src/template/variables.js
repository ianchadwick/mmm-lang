
import forEach from 'lodash/forEach';
import pickBy from 'lodash/pickBy';
import dot from '../helpers/dot';

export default class Variables {
  constructor(variables) {
    this.variables = {};
    this.addList(variables);
  }

  /**
   * Add a variable
   *
   * @param name
   * @param value
   * @returns {Variables}
   */
  add(name, value) {
    const key = this.normaliseKey(name);
    this.variables[key] = value;
    return this;
  }

  /**
   * Add a list of variables
   *
   * @param variables
   */
  addList(variables) {
    forEach(dot(variables), (value, name) => {
      this.add(name, value);
    });
    return this;
  }

  /**
   * Create a clone of the variables with some new variables
   *
   * @param variables
   * @return Variables
   */
  cloneWith(variables) {
    return (new Variables())
      .fromJS(this.variables)
      .addList(variables);
  }

  /**
   * Create the variables from a flattened list of variables
   *
   * @param variables
   * @returns {Variables}
   */
  fromJS(variables) {
    this.variables = Object.assign({}, variables);
    return this;
  }

  /**
   * Get the variable value
   *
   * @param name
   * @param defaultValue
   * @returns {undefined}
   */
  get(name, defaultValue = undefined) {
    const key = this.normaliseKey(name);

    if (typeof this.variables[key] !== 'undefined') {
      return this.variables[key];
    }

    // check if this is an array index search like band.0
    const parts = name.split('.');
    const index = parts.pop();
    const parentKey = parts.join('.');

    if (typeof this.variables[parentKey] !== 'undefined'
      && typeof this.variables[parentKey][index] !== 'undefined') {
      return this.variables[parentKey][index];
    }

    // couldn't find the key so return the default value
    return defaultValue;
  }

  /**
   * Filter the variables and return a list with the results
   * 
   * @param search
   * @return Variables
   */
  filter = (search) => {
    const filtered = pickBy(this.variables, (value, name) => {
      return name.search(search) > -1;
    });

    return (new Variables()).fromJS(filtered);
  };

  /**
   * Filter the variables by their prefix
   *
   * @param prefix
   * @param keyDecorator
   * @returns {*}
   */
  filterByPrefix = (prefix, keyDecorator = (key) => key) => {
    const variables = {};

    forEach(this.variables, (value, name) => {
      const search = new RegExp(`^${prefix}.`, 'gi');

      if (name.search(search) === 0) {
        const suffix = keyDecorator(name.replace(search, ''));
        variables[suffix] = value;
      }
    });

    return variables;
  };

  /**
   * Get the items as an object
   *
   * @return {{*}}
   */
  toJS = () => this.variables;

  /**
   * Normalise the key name
   *
   * @param name
   */
  normaliseKey = (name) => name.toLowerCase();
}
