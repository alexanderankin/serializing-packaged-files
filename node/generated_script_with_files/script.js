var Buffer = require('buffer').Buffer;
var fs = require('fs');

function serialize(item) {
  var item_buffer = fs.readFileSync(item);
  // var item_buf_array = Array.prototype.slice.call(item_buffer);
  // return ['new Buffer([', item_buf_array.toString(), '])'].join('');

  return encodeURIComponent(item_buffer.toString('ascii'));
}

function directoryToModule(directory_path, module_out_file) {
  var dir = fs.readdirSync(directory_path);
  // console.log(dir);

  var file_contents = {};
  for (var idx = 0; idx < dir.length; idx++) {
    var item = dir[idx];
    if (fs.statSync(item).isDirectory() ||
      item === "store.js") {
      continue;
    }


    file_contents[item] = serialize(item);
    // console.log(item_buf_array.toString());
  }

  var file_representations = Object.keys(file_contents).map(function (file) {
    return '"' + file + '": "' + file_contents[file] + '",'
  });
  var file_representation_string = file_representations.join("\n");
  var out = `var memfs = require('memfs');
 
var mem = new memfs.Volume();
mem.mountSync('./', {
    ${file_representation_string}
});

module.exports = mem;`
 
// console.log(mem.readFileSync('./dir/hello.js').toString());`

  fs.unlinkSync(module_out_file);
  // fs.appendFileSync(module_out_file, 'module.exports = {\n')
  // for (file in file_contents) {
  //   var line = ['\'', file, '\':',
  //     file_contents[file],
  //     ',\n'
  //   ].join('');

  //   fs.appendFileSync(module_out_file, line);
  // }
  // fs.appendFileSync(module_out_file, '};\n');
  fs.appendFileSync(module_out_file, out);
}

// serialize
directoryToModule(".", 'store.js');

function deserialize(thing) {
  return require('./store')[thing].toString()
}

// de-serialize
// console.log(require('./store').readFileSync('./script.js').toString());
