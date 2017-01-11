
import $ from './parser/dom';
import camelCase from 'lodash/camelCase';
import forEach from 'lodash/forEach';
import { selectors, tags } from './config';
import Template from './template';

/**
 * Normalise the attributes
 *
 * @param element
 * @returns {{}}
 */
const normaliseAttribs = (attribs) => {
  const attributes = {};

  forEach(attribs, (value, name) => {
    attributes[camelCase(name)] = value;
  });

  return attributes;
};

/**
 * Parse the content and return it's parts
 *
 * - Parse the html
 * - Parse each head item
 *
 * @param html
 * @param engine
 */
export default (html, engine) => {
  let $doc = $(html);
  let $html = $doc(selectors.root);

  // create the template
  const template = new Template();

  /**
   * Parse the components
   */
  engine.getComponents().forEach((component) => {
    const { tag } = component;

    $html.find(tag).each((k, element) => {
      const { attribs, children } = element;
      const replace = component(template, normaliseAttribs(attribs), children);

      if (typeof replace !== 'undefined') {
        engine.replaceComponent(
          $doc,
          element,
          replace,
          template,
          children
        );
      }
    });
  });

  // console.log($doc.html());

  // return the template
  return template.setHtml($doc.html());
};
