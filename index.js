'use strict';

const fs = require('fs');
// const sourceFile = './input.js';
const sourceFile = process.argv[2];
const UglifyJS = require('uglify-js');
const walk = require('esprima-walk')
const crypto = require('crypto');

const escodegen = require('escodegen');

let source;

try {
  source = fs.readFileSync(sourceFile, 'utf8');  
} catch (error) {
}

const esprima = require("esprima");
const { exit } = require('process');


let tree;
try {
  tree = esprima.parseScript(source);
} catch (error) {
}

// console.log(JSON.stringify(tree, null, 2))
if (!tree) {
  process.exit(1);
}
walk(tree, (node) => {



  if (node && (node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression')) {


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


  if (node && node.type === 'FunctionDeclaration') {

    let name;
    if (node && node.id && node.id.name) {
      name = node.id.name;
      node.id.name = 'MORK';
    }

    
    printFn(node, name);

  };

});


function printFn(a, name = null) {

  const b = escodegen.generate({
    "type": "Program",
    "body": [a],
    "sourceType": "script"
  })

  const code = UglifyJS.minify(b);
  const hash = crypto.createHash('md5').update(code.code).digest('hex');
  const id = crypto.randomBytes(16).toString("hex");

  fs.writeFile(`./functions/${hash}.js`, code.code, () => {});

  if(name) {
    fs.appendFileSync(`./functions/${hash}-names.txt`, `\n// ${name}`);
  }

  console.log(`${id},${sourceFile},${hash}`);

}

