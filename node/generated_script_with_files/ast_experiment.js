var acorn = require('acorn');
var escodegen = require('escodegen');

var src = `var memfs = require('memfs');
 
var mem = new memfs.Volume();
mem.mountSync('./', null);

module.exports = mem;`

var ast = acorn.parse(src);
// console.log(escodegen.generate(ast, {comment: true}));

function make_property(key, value) {
  return {
    type: "Property",
    key: {
      type: "Literal",
      value: key
    },
    value: {
      type: "Literal",
      value: value
    }
  };
}

var file_listing_items = [];
file_listing_items = file_listing_items.concat(make_property("hey", "okay"));
file_listing_items = file_listing_items.concat(make_property("hey", "now"));

file_arg = {
  type: 'ObjectExpression',
  properties: file_listing_items
}

var mountSyncCall = ast.body[2];
mountSyncCall.expression.arguments[1] = file_arg;

console.log(escodegen.generate(ast, {comment: true}));

