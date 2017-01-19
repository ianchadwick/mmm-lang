
const defaultOptions = {
  alwaysRemoveTags: true,
};

/**
 * Parse the template for variables and replace
 *
 * @param template
 * @param variables
 * @param options
 *  - alwaysRemoveTags Removes tags even when they don't exists in the variables object
 * @return string
 */
export default (template, variables, options = defaultOptions) => {
  let parseOptions = Object.assign({}, defaultOptions, options);
  
  let newTemplate = template;
  const matches = newTemplate.split(/((?:%7B|\{){2}[a-z][a-z\.\-0-9]{2,50}(?:%7D|\}){2})/ig);

  matches.forEach((match, key) => {
    if (key % 2) {
      const tag = match.replace(/(%7B|%7D|\{|\})/gi, '');

      let value = variables.get(tag);
      if (parseOptions.alwaysRemoveTags || value !== undefined) {
        if (typeof value === 'object' && value.constructor === Array) {
          value = value.join('');
        }

        if (typeof value === 'undefined') {
          value = '';
        }

        newTemplate = newTemplate.replace(match, value);
      }
    }
  });

  return newTemplate;
};
