const fs = require('fs')
const dirTree = require("directory-tree");

const config={
  sourcePath:'../imagenes',
  extensionRegex: /\.txt/,
  targetDir:'../img'
}

//function to flat the dir tree in an array of files
flattenArr = arr => 
arr.flatMap(({items=[], ...rest}) => rest.type == 'directory' ? flattenArr(rest.children) : rest)

//obtaining directory tree in json
const filteredTree = dirTree(config.sourcePath, { extensions: config.extensionRegex });
//flatening json
var files = flattenArr(filteredTree.children)

//moving each file to target dir
files.forEach(element => {
  fs.rename(element.path, config.targetDir+'/'+element.name, function (err) {
    if (err) throw err
    console.log('Successfully renamed - AKA moved!')
  })
  
});

/**
 * pasos
 * hacer el export de vitales2020_test y la instanciación de las variables para tener acceso a node y el package
 * $ sudo vim index.js (cambiar las carpetas destino y origen)
 * $ mkdir /repositorio1/data-apps/vitales/local-images/carpetaDestinoQueSepusoEnElIndex
 * $ node node_modules/flat-img-dir-tree/index.js
 */

 /**
  * comandos útiles
  * find carpetaOrigenAnidada/ -type f | wc -l
  * ls carpetaDestinoFlatten/ | wc -l
  */