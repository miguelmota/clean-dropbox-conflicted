var fs         = require('fs');
var path       = require('path');
var validators = require('./validators');
var helpers    = require('./helpers');

var isConflicted = validators.isConflicted;
var renameNoConflicted = helpers.renameNoConflicted;

function filename(path) {
    var s = path.split('/');
    return s[s.length - 1];
}

function relativePath(absDir) {
    var scriptDir = process.cwd();
    var regex = new RegExp(['^',scriptDir].join(''), 'gi');
    return absDir.replace(regex, '');
}

function resolvePath() {
    return path.resolve.apply(null, [].slice.call(arguments));
}

function error(msg) {
    return new Error(msg);
}

function fail(err) {
    if (err instanceof Error) {
        throw err;
    } else {
        throw error(err);
    }
}

function remove(filepath, cb) {
    fs.unlink(filepath, function(err) {
        if (err) return cb(err);
        return cb(null);
    });
}

function rename(oldName, newName, cb) {
    fs.rename(oldName, newName, function(err) {
        if (err) return cb && cb(err);
        return cb && cb(null, true);
    });
}

function readDir(dir, cb) {
    fs.readdir(dir, function(err, files) {
        if (err) return cb(err);
        return cb(null, files);
    });
}

function exists(filepath, cb) {
    fs.exists(filepath, function(exists) {
        if (!exists) return cb(error('Not exist'));
        return cb(null, exists);
    });
}

function isDirectory(filepath, cb) {
    fs.stat(filepath, function(err, stats) {
        if (err) return cb(err);
        if (stats.isDirectory()) {
            return cb(null, true);
        }
        return cb(error('Not directory'));
    });
}

function processFiles(files, dir) {
   files.forEach(function(filename, i) {
        exists(resolvePath(dir, filename), function(err, exists) {
            isDirectory(resolvePath(dir, filename), function(err, isDir) {
                if (isDir) clean(resolvePath(dir, filename));
                else processFile(filename, dir);
            });
        });
   });
}

function processFile(filename, dir) {
    if (isConflicted(filename)) {
        rename(resolvePath(dir, filename), resolvePath(dir, renameNoConflicted(filename)), function(err, isRenamed) {
            exists(renameNoConflicted(resolvePath(dir, filename)), function(err, exists) {
            });
            console.log('%s => %s',
                relativePath(resolvePath(dir, filename)),
                relativePath(resolvePath(dir, renameNoConflicted(filename)))
            );
        });
    }
}

function clean(dir) {
    readDir(dir, function(err, files) {
        processFiles(files, dir);
    });
}

module.exports = clean;
