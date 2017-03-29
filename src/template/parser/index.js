
import forEach from 'lodash/forEach';
import variables from './variables';

export const defaultOptions = {
  variables: {
    alwaysRemoveTags: false,
  },
};

export const getDefaultParsers = () => ({
  variables,
});

/**
 * Parse the template
 *
 * @param string template
 * @param Variables variables
 * @param {{*}} options
 * @param {{*}} parsers
 * @return string
 */
export default (template, variables, options = {}, parsers = getDefaultParsers()) => {
  let parsedTemplate = template;
  const mergedOptions = Object.assign({}, defaultOptions, options);
  
  forEach(parsers, (parser, name) => {
    const parserOptions = (typeof mergedOptions[name] !== 'undefined' ? mergedOptions[name] : {});
    parsedTemplate = parser(parsedTemplate, variables, parserOptions);
  });

  return parsedTemplate;
};
