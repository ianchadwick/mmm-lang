
import Styles from '../../src/template/styles';

describe('compose the stylesheet', () => {
  it('should add a style to the stylesheet', () => {
    const styles = new Styles();
    styles.add({
      p: {
        color: 'grey',
        display: 'inline-block',
      },
    });

    expect(styles.render()).toEqual(`<style type="text/css">p{color:grey;display:inline-block}</style>`);
  });

  it('should add a style helper', () => {
    const styles = new Styles();

    // add a very basic helper
    styles.addHelper('test', (styles) => `<style>.test{${styles.join(';')}}</style>`, ['color:red']);

    expect(styles.render()).toEqual('<style>.test{color:red}</style>');
  });
});
