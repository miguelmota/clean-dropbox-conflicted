var assert = require('assert');
var validators = require('../lib/validators');
var helpers = require('../lib/helpers');

var filename = 'package.json';
var conflictedFilename = "package (Miguel Mota's conflicted copy 2014-06-17).json";

module.exports.isConflicted = function(test) {
    assert.ok(validators.isConflicted(conflictedFilename));
    assert.notEqual(validators.isConflicted(filename), true);
    test.done();
};

module.exports.renameNoConflicted = function(test) {
    assert.equal(helpers.renameNoConflicted(conflictedFilename), filename) ;
    test.done();
};

module.exports.renameTemp = function(test) {
    assert.equal(helpers.renameTemp('package.json'), 'package.tmp.json');
    test.done();
};
