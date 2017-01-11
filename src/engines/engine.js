
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
   */
  constructor(components) {
    this.components = components;
  }

  /**
   * Get the components
   */
  getComponents = () => this.components;

  /**
   *
   * @param name
   */
  getComponent = (name) => (
    typeof this.components[name] === 'function' ? this.components[name] : noop
  );

  /**
   * Replace the element with the replacement item
   *
   * @param $doc
   * @param element
   * @param replacement
   * @param template
   * @param children
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
    
    $doc(element).replaceWith(
      $doc(parser(replacement, variables, options))
    );
  };
}
