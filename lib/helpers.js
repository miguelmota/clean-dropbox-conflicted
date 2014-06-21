function renameNoConflicted(name) {
    var regex = new RegExp('(\\s?\\({1}.*\'s conflicted copy\\s{1}\\d{4}-\\d{2}-\\d{2}\\){1})', 'gi');
    return name.replace(regex, '');
}

function renameTemp(name) {
    var regex = new RegExp('(\\.{1}\\w+)$','gi');
    return name.replace(regex, function(m, i) {
        return ['.tmp'].concat(m).join('');
    });
}

module.exports = {
    renameNoConflicted: renameNoConflicted,
    renameTemp: renameTemp
};
