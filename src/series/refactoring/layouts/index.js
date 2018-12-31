const requireAll = require('../../../util/require-all');

module.exports = (function layoutsFactory() {
    const layouts = Object.create(null);

    requireAll(__dirname, 'index.js')
        .forEach(layout => layouts[layout.name] = layout);

    return layouts;
})();
