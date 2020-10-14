const mdLinks = require('../index.js');


describe('mdLinks.validarRuta', () => {

  it('debe retornar que el link ingresado es valido para lectura', () => {
    return mdLinks.validarRuta("https://github.com/karlaguaita/bog001-md-links/blob/master/README.md").then((res) => {
      expect(res).toMatch('Link correcto');
    });
  });

  it('debe retornar que el link ingresado no es valido para lectura', () => {
    return mdLinks.validarRuta("https://karlaguaitatest.com").then((res) => {
      expect(res).toMatch('Error');
    });
  });

});
 
describe('mdLinks.leerArchivo', () => {

  it ('debe leer un archivo en el link y retornar las url que estan en el archivo', ()=>{
    return mdLinks.validarRuta("README.md").then((res) => {
      expect(res.length).toBe(5);
    });
  })
});

describe('debe retornar el proceso de principal de validar ruta de archivo', () => {

  it ('debe leer un archivo de la ruta e indicar si la ruta es valida', ()=>{
    return mdLinks.PvalidarRuta("README.md").then((res) => {
      expect(res).toBe(true);
    });
  })
});