
import cheerio from 'cheerio';
import jQuery from 'jquery';

class Dom {
}

class Cheerio extends Dom {
  constructor(html) {
    super();

    this.$ = cheerio.load(html, {
      decodeEntities: false,
      normalizeWhitespace: true,
      withStartIndices: true,
      xmlMode: true,
    });
  }

  /**
   * Return the node in a normalised state
   *
   * @param key
   * @param node
   * @returns {{}}
   */
  normaliseNode = (node) => {
    const { attribs, children, name, parent, type } = node;

    return {
      attributes: attribs,
      children: this.normalise(children),
      name: name,
      parent: parent,
      type: type,
    };
  };

  /**
   * Normalise the result set
   *
   * @param result
   */
  normalise = (result) => {
    const nodes = [];

    if (result) {
      const method = (typeof result.each === 'function' ? 'each' : 'forEach');

      result[method]((k, v) => {
        nodes.push(this.normaliseNode(v));
      });
    }

    return nodes;
  };

  /**
   * Search using the css selector
   *
   * @param selector
   * @returns {Cheerio}
   */
  find(selector) {
    return this.normalise(this.$(selector));
  }
}


// export default (html) =>
//   (typeof window === 'undefined' ? new Cheerio(html) : new jQuery(html));

export default (html) => {
  if (typeof window === 'undefined') {
    // node
    return cheerio.load(html, {
      decodeEntities: false,
      normalizeWhitespace: false,
      withStartIndices: true,
      xmlMode: true,
    });
  }

  return jQuery(html);
};
