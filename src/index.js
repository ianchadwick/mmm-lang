
import parser from './parser';
import HtmlEmail from './engines/html-email';

export const toEmail = (mmm) => {
  const template = parser(mmm, new HtmlEmail());
  const html = template.getHtml();

  return {
    html,

    // use something like html-to-text
    text: '',
  };
};


import test from './tests';
