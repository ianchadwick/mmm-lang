
import Engine from '../engine';

// import the head components
import merge from '../../components/head/merge';
import font from '../../components/head/font/html-email';
import title from '../../components/head/title/html5';

// import the body components
import column from '../../components/body/column/html-email';
import row from '../../components/body/row/html-email';

// global components
import conditional from '../../components/global/conditional/html5';

// setup the default components in the order they should be executed
const defaultComponents = [
  // parse the merge tags & title
  merge,
  title,

  // parse the body components
  row,
  column,

  // parse the rest of the head tags last as the body components can add requirements
  // like styles etc.
  font,

  // parse the conditionals
  conditional,
];


class HtmlEmail extends Engine {
  static getName() {
    return 'html-email';
  }

  /**
   * Init with the components
   *
   * @param defaultComponents
   */
  constructor(components = defaultComponents) {
    super(components);
  }

  /**
   * Render the template
   */
  render() {

  }
}

export default HtmlEmail;
