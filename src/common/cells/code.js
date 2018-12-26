const { html } = require('common-tags');
const Prism = require('prismjs');

const normalizeWhitespace = (function loadNormalizer() {
    require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');

    return Prism.plugins.NormalizeWhitespace;
})();

const loadLanguages = require('prismjs/components/');
loadLanguages(['java', 'c', 'cpp']);


const codeBlockWithoutNumbering = function codeBlockWithoutNumbering(language) {
    return function tag(codeFragments, ...comments) {
        const fragmentHtmls = codeFragments.map(fragment => codeFragmentToHtml(language, fragment));
        const commentHtmls = comments.map(commentToHtml);

        return commentHtmls
            .reduce((acc, curr, index) => acc.concat(curr, fragmentHtmls[index + 1]), [ fragmentHtmls[0] ])
            .join('\n');
    };

    function codeFragmentToHtml(language, codeFragment) {
        const normalizedCode = normalizeWhitespace.normalize(codeFragment);
        const codeHtml = Prism.highlight(normalizedCode, Prism.languages[language], language);

        return html`
            <pre class="language-${language}"><code class="language-${language}">
            ${codeHtml}
            </code></pre>
        `;
    }

    function commentToHtml(comment) {
        return html`
            <div class="code-comment off">
                <div class="toggle on">
                    <img src="/resources/img/eye-off-outline.svg">
                </div>
                <div class="toggle off">
                    <img src="/resources/img/eye-outline.svg">
                </div>
                <div class="description on">
                    ${comment}
                </div>
                <div class="description off">
                    Toggle comment.
                </div>
            </div>
        `;
    }
};

codeBlockWithoutNumbering.cell = function codeBlockWithoutNumberingCell(language) {
    return function wrapper(...args) {
        return html`
            <div class="cell code-block-cell">
                ${codeBlockWithoutNumbering(language)(...args)}
            </div>
        `;
    };
};

module.exports = {
    codeBlockWithoutNumbering
};
