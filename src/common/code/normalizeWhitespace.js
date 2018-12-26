const Prism = require('prismjs');

const normalizeWhitespace = (function loadNormalizer() {
    require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');

    return Prism.plugins.NormalizeWhitespace;
})();

module.exports = code => normalizeWhitespace.normalize(code);
