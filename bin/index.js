#!/usr/bin/env node

var path  = require('path');
var clean = require(path.join('../lib/clean'));

var argv = process.argv.slice(1);

if (!argv[0]) {
    throw new Error('Need directory argument');
}

var directory = path.resolve(argv[0]);

clean(directory);
