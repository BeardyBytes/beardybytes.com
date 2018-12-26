const Prism = require('prismjs');

const loadLanguages = require('prismjs/components/');
loadLanguages(['java', 'c', 'cpp']);

const normalizeWhitespace = require('./normalizeWhitespace');

module.exports = function highlight(language, code) {
    const normalizedCode = normalizeWhitespace(code);
    return Prism.highlight(normalizedCode, Prism.languages[language], language);
};
