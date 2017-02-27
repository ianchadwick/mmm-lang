
import Engine from '../engine';

// import the head components
import html from '../../components/global/html/html-email';
import head from '../../components/head/head/html-email';
import merge from '../../components/head/merge';
import font from '../../components/head/font/html-email';
import title from '../../components/head/title/html5';

// import the body components
import body from '../../components/body/body/html-email';
import column from '../../components/body/column/html-email';
import row from '../../components/body/row/html-email';
import box from '../../components/body/box/html-email';
import button from '../../components/body/button/html-email';
import divider from '../../components/body/divider/html-email';
import image from '../../components/body/image/html-email';

// global components
import conditional from '../../components/global/conditional/html5';

// import the transforms
import fontTransform from '../../transforms/font/html-email';
import doctypeTransform from '../../transforms/doctype/html-email';

// setup the default components in the order they should be executed
const defaultComponents = [
  // parse the merge tags & title
  merge,
  title,
  head,
  html,

  // parse the body components
  row,
  column,
  box,
  button,
  divider,
  image,
  body,

  // parse the conditionals
  conditional,

  // parse the rest of the head tags last as the body components can add requirements
  // like styles etc.
  font,
];

const defaultTransforms = [
  fontTransform,

  // this must be the last item otherwise the HTML parsing may remove it
  doctypeTransform,
];

class HtmlEmail extends Engine {
  static getName() {
    return 'html-email';
  }

  /**
   * Init with the components
   *
   * @param defaultComponents
   * @param defaultTransforms
   */
  constructor(components = defaultComponents, transforms = defaultTransforms) {
    super(components, transforms);
  }
}

export default HtmlEmail;
