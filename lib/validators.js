function isConflicted(name) {
    var regex = new RegExp('(conflicted copy)|(무시된 항목 충돌)\\s{1}\\d{4}-\\d{2}-\\d{2}', 'gi');
    return regex.test(name);
}

module.exports = {
    isConflicted: isConflicted
};
