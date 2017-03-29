
import parser from '../template/parser';

export default class Engine {
  /**
   * Get the engine name
   *
   * @return string
   */
  static getName() {
    console.warn('Engine.getName() not implemented by concrete class');
  }

  /**
   * Init with the components
   *
   * @param components
   * @param transforms
   */
  constructor(components = [], transforms = []) {
    this.components = components;
    this.transforms = transforms;
  }

  /**
   * Get the components
   */
  getComponents = () => this.components;

  /**
   * Get the transforms
   */
  getTransforms = () => this.transforms;

  /**
   * Apply the transforms to the html
   *
   * @param getDom
   * @param html
   * @return string
   */
  applyTransforms = ({ getDom, html }) => this.transforms.reduce((template, transform) => (
    transform({
      getDom: getDom,
      html: template,
    })
  ), html);

  /**
   * Get the component by it's tag name
   *
   * @param name
   * @return Function|false
   */
  getComponentByTag = (name) => {
    const nameLowercase = String(name).toLowerCase();
    for (let i = 0; i < this.components.length; i += 1) {
      if (this.components[i].tag === nameLowercase) {
        return this.components[i];
      }
    }

    return false;
  };

  /**
   * Replace the element with the replacement item
   *
   * @param $doc
   * @param element
   * @param replacement
   * @param template
   * @param children
   * @return boolean
   */
  replaceComponent = ($doc, element, replacement, template, children = []) => {
    const childrenHtml = children.reduce((items, child) => {
      // get the child html
      const html = $doc(child).wrap('<div />').parent().html();

      // add to the list of children
      items.push(html);

      return items;
    } ,[]);

    const variables = template.getVariables().cloneWith({
      children: childrenHtml,
    });

    const options = {
      alwaysRemoveTags: false,
    };

    // parse the tag and return it's contents
    const parsed = parser(replacement, variables, options);

    $doc(element).replaceWith(
      $doc(parsed)
    );

    // are there new tags to parse?
    return parsed.search(/<mmm-[a-z]*/i) === 0;
  };

  /**
   * Append the content to the $doc
   * @param $doc
   * @param element
   * @param replacement
   * @param template
   * @param children
   */
  appendComponent = ($doc, element, replacement, template, children = []) => {
    const parsed = this.parseComponent($doc, replacement, template, children);

    $doc(element).append(
      $doc(parsed)
    );
  };

  /**
   * Parse the component
   *
   * @param element
   * @param template
   * @param children
   * @returns {string}
   */
  parseComponent = (element, template, children = []) => {
    const variables = template.getVariables().cloneWith({
      children,
    });

    const options = {
      alwaysRemoveTags: false,
    };

    // parse the tag and return it's contents
    return parser(element, variables, options);
  }
}
