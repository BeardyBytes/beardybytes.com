const requireAll = require('../../../util/require-all');

const posts = requireAll(__dirname, ['index.js']);

module.exports = posts;
