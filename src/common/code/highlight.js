const Prism = require('prismjs');

const normalizeWhitespace = (function loadNormalizer() {
    require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');

    return Prism.plugins.NormalizeWhitespace;
})();

const loadLanguages = require('prismjs/components/');
loadLanguages(['java', 'c', 'cpp']);

module.exports = function highlight(language, code) {
    const normalizedCode = normalizeWhitespace.normalize(code);
    return Prism.highlight(normalizedCode, Prism.languages[language], language);
};
