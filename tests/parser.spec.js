
import parser from '../src/parser';
import HtmlEmail from '../src/engines/html-email';
import { basicTemplate } from './fixtures';

import { jsdom } from 'jsdom';
import jQuery from 'jquery';

describe('parse a basic template', () => {
  // render the template
  const template = parser(basicTemplate, new HtmlEmail());

  it('should return the correct merge values from the <mmm-head>', () => {
    expect(template.getVariables().toJS()).toEqual({
      'user.firstname': 'Ian',
      'user.email': 'support@mizmoz.com',
      'style.fontweight': '12',
    });
  });

  it('should parse the body section', () => {
    expect()
  });

  it('should create jquery', () => {
    const config = {
      parsingMode: 'xml',
    };

    const window = jsdom(basicTemplate, config).defaultView;
    const $ = jQuery(window);

    // fetch the entire document
    // console.log(window.document.documentElement.outerHTML);

    $('mmm').children().each((key, element) => {
      console.log(element.tagName);
    });
  });
});
