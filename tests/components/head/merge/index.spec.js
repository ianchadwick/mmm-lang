
import Template from '../../../../src/template';
import merge from '../../../../src/components/head/merge';

describe('parse the merge tags', () => {
  it('should add the merge variables to the template', () => {
    const template = new Template();
    const attributes = {
      name: 'title',
      value: 'Impending Cat-astrophe',
    };

    // parse and add the attributes to the template
    merge(template, attributes, []);

    expect(template.getVariables().toJS()).toEqual({
      title: 'Impending Cat-astrophe',
    });
  });
});
