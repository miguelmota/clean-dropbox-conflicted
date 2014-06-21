var assert     = require('assert');
var fs         = require('fs');
var path       = require('path');
var validators = require('../lib/validators');
var helpers    = require('../lib/helpers');
var clean = require('../lib/clean');

var directory = 'example';
var filename = 'foo.txt';
var conflictedFilename = "foo (Miguel Mota's conflicted copy 2014-06-17).txt";

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

module.exports.clean = function(test) {
    assert(fs.existsSync(path.resolve(process.cwd(), directory, filename)), true);
    assert(fs.existsSync(path.resolve(process.cwd(), directory, conflictedFilename)), true);

    clean(path.resolve(process.cwd(), directory));

    assert(fs.existsSync(path.resolve(process.cwd(), directory, filename)), true);
    assert(fs.existsSync(path.resolve(process.cwd(), directory, conflictedFilename)), false);

    test.done();
};
