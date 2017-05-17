/**
 * 
 * 
 * Concepts: 
 * * store: the file that will module.export a patched "in-code" filesystem.
 */
var acorn = require('acorn');
var escodegen = require('escodegen');

var src = `var memfs = require('memfs');

var mem = new memfs.Volume();
mem.mountSync('./', null);

module.exports = mem;`

var src = `var memfs = require('memfs');

var mem = new memfs.Volume();
mem.mountSync('./', null);

module.exports = mem;`

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

function makeStoreString(fileNameContentPairs) {
  if (!(Array.isArray(fileNameContentPairs))) throw new TypeError();

  if (fileNameContentPairs.length) {
    var file_listing_items = fileNameContentPairs.reduce(function (list, pair) {
      return list.concat(make_property(pair[0], pair[1]));
    }, []);

    var file_arg = {
      type: 'ObjectExpression',
      properties: file_listing_items
    }

    var ast = acorn.parse(src);
    var mountSyncCall = ast.body[2];
    mountSyncCall.expression.arguments[1] = file_arg;

    return escodegen.generate(ast, { format: { indent: { style: '  ' }}});
  }

  return src;
}

function writeAstToFile(ast, file) {
  fs.writeSync(file, escodegen.generate(ast, { format: { indent: { style: '  ' }}}));
}

module.exports = {
  make: makeStoreString
  // write: writeAstToFile
};
