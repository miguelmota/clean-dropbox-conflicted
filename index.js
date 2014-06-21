var path       = require('path');
var clean = module.exports = require('./lib/clean');

var argv = process.argv.slice(2);

if (!argv[0]) {
    throw new Error('Need directory argument');
}

var directory = path.resolve(argv[0]);

clean(directory);
