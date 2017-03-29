
import Variables from '../../../src/template/variables';
import parser from '../../../src/template/parser/variables';

const variables = new Variables({
  NamE: 'Ian',
  eyes: 'blue',
  likes: {
    Music: 'Djent',
  },
});

describe('template variable parser', () => {
  /**
   * Replace Merge tags {{merge}} to value
   */
  it('should replace the merge tags with the variable values', () => {
    const content = `<p>{{name}} has {{eyes}} eyes and likes to listen to {{likes.music}}`;

    expect(parser(content, variables))
      .toEqual(`<p>Ian has blue eyes and likes to listen to Djent`);
  });

  /**
   * Remove items that don't exist to clean up the template
   */
  it('should remove the merge tags that do not exist', () => {
    const content = `<p>{{name}} likes to watch to {{likes.tv}}`;

    expect(parser(content, variables))
      .toEqual(`<p>Ian likes to watch to `);
  });

  /**
   * Do not remove non existent items so we can parse the template again later when we
   * have the values
   */
  it('should not remove the merge tags that do not exist', () => {
    const content = `<p>{{name}} likes to watch to {{likes.tv}}`;

    expect(parser(content, variables, { alwaysRemoveTags: false }))
      .toEqual(`<p>Ian likes to watch to {{likes.tv}}`);
  });

  /**
   * Replace an array of items from {{item}} to 12345
   */
  it('should replace an array of variables', () => {
    const variablesWithArray = new Variables({
      number: [
        1, 2, 3, 4, 5,
      ],
    });

    const content = `<p>{{number}}</p>`;

    expect(parser(content, variablesWithArray))
      .toEqual(`<p>12345</p>`);
  });
});
