'use strict';

const fs = require('fs');
// const sourceFile = './input.js';
const sourceFile = process.argv[2];
const UglifyJS = require('uglify-js');
const walk  =  require (  'esprima-walk'  )

const escodegen = require('escodegen');


const source = fs.readFileSync(sourceFile, 'utf8');


const esprima = require("esprima");


let tree = esprima.parseScript(source);
// console.log(JSON.stringify(tree, null, 2))



walk( tree, ( node ) => {
  


  if(node.type === 'ArrowFunctionExpression') {

    
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

    
    printFn(node);
  };

})





function printFn(a) {

  const b = escodegen.generate({
    "type": "Program",
    "body": [a],
    "sourceType": "script"
  })

  // console.log('------------');
  const code = UglifyJS.minify(b);

  const base64Code = Buffer.from(code.code).toString('base64');

  console.log(`"${sourceFile}"; "${base64Code}";`);
}


// const check = (body) => {
//   body.forEach((el) => {
//     if(el.type === 'FunctionDeclaration') {

      
//       // console.log(JSON.stringify(el, null, 2));

      
//       printFn(escodegen.generate({
//         "type": "Program",
//         "body": [
//           el
//         ],
//         "sourceType": "script"

//       }));

//       if (el.body && el.body.body) {
//         check(el.body.body);
//         // console.log(el.declarations[0].init.body);
//       }



//     }
//     if (el.type == "VariableDeclaration") {
//       // console.log(el);
      
//       // console.log('------------');
//       printFn(escodegen.generate({
//         "type": "Program",
//         "body": [
//           el.declarations[0]
//         ],
//         "sourceType": "script"

//       }));


//       el.declarations.forEach((d) => {
//         if (d.init && d.init.body && d.init.body.body) {
//           check(d.init.body.body);
//           // console.log(el.declarations[0].init.body);
//         }

//       });

    
//     }
//   });
  
  
// }


// check(tree.body);

// tree.body.forEach((el) => {
//     if (el.type == "VariableDeclaration") {
//         // console.log(el);
//         console.log(el.declarations);
//         console.log(el.declarations[0].id);
//         console.log(el.declarations[0].id.name);
//     }
// });

// const result = UglifyJS.minify(source, {
//   parse: {},
//     compress: false,
//     mangle: false,
//     output: {
//         ast: true,
//         code: false  // optional - faster if false
//     }
// });

// console.log('result', result);







// console.log('============');

// var toplevel = UglifyJS.parse(source);
// var walker = new UglifyJS.TreeWalker(function (node) {
//   if (node instanceof UglifyJS.AST_Defun) {
//     // string_template is a cute little function that UglifyJS uses for warnings
//     console.log(`Found function `, {
//       name: node.name.name,
//       line: node.start.line,
//       col: node.start.col
//     });

//     printFn(escodegen.generate({
//       "type": "Program",
//       "body": [
//         node
//       ],
//       "sourceType": "script"

//     }));
//   }
//   if (node instanceof UglifyJS.AST_Call) {
//     // string_template is a cute little function that UglifyJS uses for warnings



// console.log(JSON.stringify(node, null, 2))

//     // console.log(string_template("Found function {name} at {line},{col}", {
//     //     name: node.name,
//     //     line: node.start.line,
//     //     col: node.start.col
//     // }));

//     // console.log(`Found arrow function `, node.expression.print_to_string(), node.expression);
//   }
// });
// toplevel.walk(walker);




// var ast = UglifyJS.parse(source);







// function visitor(node, descend) {
//     console.log('test', node.type);
//     // asdfalsdkmfasd
// };
// var walker = new UglifyJS.TreeWalker(visitor);
// ast.walk(walker);
