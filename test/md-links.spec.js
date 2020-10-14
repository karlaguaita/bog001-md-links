const mdLinks = require('../index.js');

describe('mdLinks', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof(mdLinks)).toBe('function');
  });

  it('Debe retornar un arreglo de un solo elemento', () => {
    return mdLinks("README.md").then((res) => {
      expect(res.length).toStrictEqual(1);
    });
  });

  it('Debe retornar un arreglo con el siguiente elemento', () => {
    return mdLinks("README.md").then((res) => {
      expect(res).toStrictEqual([{"file": "README.md", "href": "https://www.youtube.com/watch?v=lPPgY3HLlhQ", "text": "Recursión."}]);
    });
  });

  it('Debe retornar un arreglo con el siguiente elemento', () => {
    return mdLinks("README.md", {validate: true}).then((res) => {
      expect(res).toStrictEqual([{"file": "README.md", "href": "https://www.youtube.com/watch?v=lPPgY3HLlhQ", "ok": true, "status": 200, "text": "Recursión."}]);
    });
  });

});
