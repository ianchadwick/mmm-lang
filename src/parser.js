
import Dom from './parser/dom';
import toArray from 'lodash/toArray';
import Template from './template';

/**
 * Get the elements outer html
 *
 * @param element
 * @param children
 * @return string
 */
const getOuterHtml = (element, children = []) => {
  if (element.nodeName === '#text') {
    return element.textContent;
  }

  const node = element.cloneNode();

  if (children && children.length) {
    node.innerHTML = '{{children}}'
  }

  return node.outerHTML;
};

/**
 * Parse the component
 *
 * @param tagName
 * @param attributes
 * @param children
 * @param options
 * @param onError
 * @returns {*}
 */
export const parseComponent = (tagName, attributes, children = [], options = {}, onError = () => '') => {
  const component = options.engine.getComponentByTag(tagName);

  if (! component) {
    return onError();
  }

  const componentOptions = Object.assign({}, options, {
    parseComponent: (name, attributes, children = []) => {
      return parseComponent(
        name,
        options.dom.normaliseAttributes(attributes),
        children,
        componentOptions,
        onError()
      );
    },
  });

  // and also passed in the options now
  return component(attributes, children, componentOptions);
};

/**
 * Parse the html element and it's children
 *
 * @param element
 * @param dom
 * @param template
 * @param engine
 * @param parentAttributes
 * @returns {string}
 */
const parseElement = (element, dom, template, engine, parentAttributes = {}) => {
  // get the tag name, attributes and children for the element
  const { tagName, attributes, children } = dom.getElementDetails(element, {
    attributes: ({ tagName, attributes }) => template.getAttributesForComponent(tagName, attributes),
  });

  const options = {
    dom,
    engine,
    parentAttributes,
    parser: (element, parentAttributes = {}) => {
      return parseElement(dom.getJquery()(element)[0], dom, template, engine, parentAttributes);
    },
    template,
  };

  const html = parseComponent(tagName, attributes, children, options, () => {
    return getOuterHtml(element, children);
  });

  // parse any children the element might have
  let parsedChildren = children.map((child) => {
    return parseElement(child, dom, template, engine, attributes);
  });

  return engine.parseComponent(html, template, parsedChildren);
};

/**
 * Parse the merge tags and add to the template
 *
 * @param dom
 * @param template
 * @param engine
 */
const parseMerge = (dom, template, engine) => {
  // find all the merge tags and parse them
  toArray(dom.getDocument().querySelectorAll('mmm-merge')).map((element) => {
    parseElement(element, dom, template, engine);
  });
};

/**
 * Create the document
 *
 * @param html
 * @param root
 * @returns {{$doc: (jQuery|HTMLElement), $html: *}}
 */
const createDocument = (html, root) => {
  const wrappedHtml = [
    `<${root}>`,
    html,
    `</${root}>`,
  ].join("\n");

  // create the document and html
  let $doc = $(wrappedHtml);
  let $html = $doc(root);

  return {
    $doc,
    $html,
  };
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
  // create the template
  const template = new Template();

  // init the dom
  const dom = Dom(html);
  const mmm = dom.getRoot();

  // parse the merge tags
  parseMerge(dom, template, engine);

  // parse the document
  let parsedHtml = parseElement(mmm, dom, template, engine, false);

  // add the style to the head
  parsedHtml = parsedHtml.replace('</head>', `${template.styles.render()}\n</head>`);

  // apply the transformations
  parsedHtml = engine.applyTransforms({ html: parsedHtml });

  // set the template html
  template.setHtml(parsedHtml);

  return template;

  /*
  const root = 'root';

  // create the document and html
  let { $doc, $html } = createDocument(html, root);

  // create the template
  const template = new Template();

  // parse the document
  const parsed = parseElement($html.children()[0], $doc, template, engine, false);

  // parse the document again
  $doc = createDocument(parsed, root).$doc;

  // add the style to the head
  $doc('head').append($doc(template.styles.render()));

  template.setHtml($doc(root).html());

  return template;
  */
};
