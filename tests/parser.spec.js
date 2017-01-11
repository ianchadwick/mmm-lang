
import parser from '../src/parser';
import HtmlEmail from '../src/engines/html-email';
import { basicTemplate } from './fixtures';

describe('parse a basic template', () => {
  // render the template
  const template = parser(basicTemplate, new HtmlEmail());

  it('should return the correct merge values from the <mmm-head>', () => {
    expect(template.getVariables().toJS()).toEqual({
      'user.firstname': 'Ian',
      'user.email': 'support@mizmoz.com',
      'styles.fontweight': '12',
    });
  });

  it('should parse the body section', () => {
    expect()
  })
});
