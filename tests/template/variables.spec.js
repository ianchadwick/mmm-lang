
import Variables from '../../src/template/variables';

const variables = new Variables({
  NamE: 'Ian',
  eyes: 'blue',
  likes: {
    Music: 'yes',
  },
  bands: [
    'Killswitch Engage',
    'Le Matos',
  ]
});

describe('perform operations on the Variables object', () => {
  it('should init the variables object with some variables', () => {
    expect(variables.get('name')).toEqual('Ian');
    expect(variables.get('eyes')).toEqual('blue');
    expect(variables.get('likes.music')).toEqual('yes');
  });

  it('should return a normalised key => value pair object of all the variables', () => {
    expect(variables.toJS()).toEqual({
      name: 'Ian',
      eyes: 'blue',
      bands: [
        'Killswitch Engage',
        'Le Matos',
      ],
      'likes.music': 'yes',
    });
  });

  it('should return a value by key', () => {
    expect(variables.get('bands.1')).toEqual('Le Matos');
  });
});
