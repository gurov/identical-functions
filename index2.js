'use strict';

const fs = require('fs');
const sourceFile = './input.js';
// const sourceFile = process.argv[2];
const UglifyJS = require('uglify-js');
const walk  =  require (  'esprima-walk'  )

const escodegen = require('escodegen');


const source = fs.readFileSync(sourceFile, 'utf8');


const esprima = require("esprima");


let tree = esprima.parseScript(source);
// console.log(JSON.stringify(tree, null, 2))



walk( tree, ( node ) => {

  if(node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression') {

    
    const z = {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "z"
          },
          "init": node
        }
      ],
      "kind": "const"
    };
    
    printFn(z);

  };


  if(node.type === 'FunctionDeclaration') {

      
    // console.log(JSON.stringify(node, null, 2));
    let name;
    if (node && node.id && node.id.name) {
      name = node.id.name;
      node.id.name = 'MORK';
    }

    
    printFn(node);
    

  };

})





function printFn(a, name) {

  const b = escodegen.generate({
    "type": "Program",
    "body": [a],
    "sourceType": "script"
  })

  // console.log('------------');
  const code = UglifyJS.minify(b);

  const base64Code = Buffer.from(code.code).toString('base64');
  // fs.appendFileSync(`./functions/`, `\n// ${name}`);
  console.log(`"${sourceFile}"; "${code.code}";`);
}

