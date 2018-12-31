const requireAll = require('../../../util/require-all');

module.exports = (function entriesFactory() {
    const entries = requireAll(__dirname, ['index.js']);

    entries.sort((a, b) => a - b);

    return entries;
})();
