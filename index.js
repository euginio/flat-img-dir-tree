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
