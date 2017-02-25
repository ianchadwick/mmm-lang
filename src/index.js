
import dom from './parser/browser/dom.js';
import parser from './parser';
import HtmlEmail from './engines/html-email';

export const toEmail = (mmm) => {
  const template = parser(mmm, dom, new HtmlEmail());
  const html = template.getHtml();

  return {
    html,

    // use something like html-to-text
    text: '',
  };
};

import test from './tests';
