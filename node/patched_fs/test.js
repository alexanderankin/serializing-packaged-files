// console.log("this has been a successful monkey patch");

var module_prototype = require('module').prototype;
var old_require = module_prototype.require;

module_prototype.require = function() {
  if (arguments['0'] !== "fs")
    return old_require.apply(this, arguments);
  else
    return old_require("./patched");
};

var result = require("querystring");
var result = require("fs");
console.log(result)
