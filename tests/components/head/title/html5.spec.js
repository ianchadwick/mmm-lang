
import { render } from '../../../../src/components/head/title/html5';

describe('render the title', () => {
  it('should return the title tag', () => {
    const attributes = {
      title: 'Impending Cat-astrophe',
    };

    expect(render(attributes))
      .toEqual(`<title>Impending Cat-astrophe</title>`);
  });
});