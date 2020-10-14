const fetch = require('node-fetch');
const fs = require("fs");
const path = require('path');
const marked = require("marked");

const validarRuta = function validarRuta(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {method: 'GET'})
      .then(res => {
        // console.log(res)
        if (res.status >= 200 && res.status < 300)
          resolve('Link correcto')
        else
          resolve('Error')
        
      }).catch((err)=>{
        resolve('Error')
      })
  })
}

const validarRutaStatus = function validarRutaStatus(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {method: 'GET'})
      .then(res => {
        // console.log(res)
        resolve(res.status)
        
      }).catch((err)=>{
        resolve('Error')
      })
  })
}

const leerArchivo = function leerArchivo(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data)=>{
      // console.log(err)
      if (err)
        return []

      const html = marked(data)
      // console.log(html)
      const arrayUrl = html.split('href=')
      arrayUrl.shift()
      let arregloUrl = []
      for (let index = 0; index < arrayUrl.length; index++) {
        if (arrayUrl[index].split(arrayUrl[index][0])[1].includes('http'))
        {
          arregloUrl.push({
            href: arrayUrl[index].split(arrayUrl[index][0])[1],
            text: arrayUrl[index].split(">")[1].split("</")[0],
            file: path
          })
        }
          
      }
      // console.log(arregloUrl)
      resolve(arregloUrl)
    })
  })
}

const mdLinks = function PvalidarRuta(pathUser, options) {
  const ext = path.extname(pathUser);
  // console.log(ext);
  return new Promise((resolve, reject) => {
    if(ext === '.md'){
      leerArchivo(pathUser).then((urls)=>{
        //console.log(respuesta)
        if(urls.length==0)
        {
          resolve('el archivo no contiene link para validar')
        }
        else{
          let arreglo=[]
          let arregloAns = []
          if (!options)
          {
            resolve(urls)
          }
          else if (options.validate)
          {
            let ok
            for (let index = 0; index < urls.length; index++) {
              arreglo.push(validarRutaStatus(urls[index].href).then((respuesta)=>{

                if (respuesta > 199 && respuesta < 300){
                  ok = true
                }
                else
                  ok = false

                let res = {
                  href: urls[index].href,
                  text: urls[index].text,
                  file: urls[index].file,
                  status: respuesta,
                  ok
                }

                arregloAns.push(res)

                return true
                  
              }))
              
            }
            Promise.all(arreglo).then(()=>{
              resolve(arregloAns)
            })
          }
          // console.log(urls)
          
        }
      })
    }
    else{
      resolve('archivo no valido')
    }
  })
  
}

module.exports = mdLinks;
