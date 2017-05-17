var assert = require('assert');
var ast_experiment = require('./ast_experiment');

describe('ast_experiment', function() {
  it('should require an Array', function() {

    assert.throws(() => {
      ast_experiment.make(null)
    }, TypeError);

  });

  it('should return valid js for blank input', function() {
    var expected = `var memfs = require('memfs');

var mem = new memfs.Volume();
mem.mountSync('./', null);

module.exports = mem;`

    var actual = ast_experiment.make([]);
    console.log(actual, expected)
    assert.equal(expected, actual);
  });

  it('should return what i ask when it is given', function () {
    var expected = `var memfs = require('memfs');
var mem = new memfs.Volume();
mem.mountSync('./', {
  'stuff': 'okay',
  'stuff': 'okay',
  'stuff': 'okay',
  'stuff': 'okay'
});
module.exports = mem;`
    
    var actual = ast_experiment.make([
      ['stuff', 'okay'],
      ['stuff', 'okay'],
      ['stuff', 'okay'],
      ['stuff', 'okay']
    ]);
    assert.equal(expected, actual);

    var expected = `var memfs = require('memfs');
var mem = new memfs.Volume();
mem.mountSync('./', { 'stuff': 'okay' });
module.exports = mem;`
    
    var actual = ast_experiment.make([
      ['stuff', 'okay']
    ]);
    assert.equal(expected, actual);
  });
});
