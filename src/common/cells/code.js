const { html } = require('common-tags');
const Prism = require('prismjs');

const normalizeWhitespace = (function loadNormalizer() {
    require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');

    return Prism.plugins.NormalizeWhitespace;
})();

const loadLanguages = require('prismjs/components/');
loadLanguages(['java', 'c', 'cpp']);


const NEW_LINE_EXP = /\n(?!$)/g;

function codeFragmentToHtml(language, codeFragment) {
    const normalizedCode = normalizeWhitespace.normalize(codeFragment);
    const codeHtml = Prism.highlight(normalizedCode, Prism.languages[language], language);

    return html`
        <pre class="language-${language}"><code class="language-${language}">
        ${codeHtml}
        </code></pre>
    `;
};

function codeFragmentToNumberedHtml(language, codeFragment, start) {
    const normalizedCode = normalizeWhitespace.normalize(codeFragment);
    const codeHtml = Prism.highlight(normalizedCode, Prism.languages[language], language);

    const match = normalizedCode.match(NEW_LINE_EXP);
    const lineCount = match ? match.length + 1 : 1;

    const lineNumbers = [];
    for (let i = start; i < start + lineCount; ++i) {
        lineNumbers.push(`<span>${i}</span>`);
    }

    const content = html`
        <pre class="line-numbers language-${language}"><code class="language-${language}">
        ${codeHtml}<span class="line-numbers-rows">${lineNumbers.join('')}</span>
        </code></pre>
    `;

    return {
        content,
        end: start + lineCount
    };
};

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
};

const codeBlockWithoutNumbering = function codeBlockWithoutNumbering(language) {
    return function tag(codeFragments, ...comments) {
        const fragmentHtmls = codeFragments.map(fragment => codeFragmentToHtml(language, fragment));
        const commentHtmls = comments.map(commentToHtml);

        return commentHtmls
            .reduce((acc, curr, index) => acc.concat(curr, fragmentHtmls[index + 1]), [ fragmentHtmls[0] ])
            .join('\n');
    };
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

const codeBlockWithNumbering = function codeBlockWithNumbering(language) {
    return function tag(codeFragments, ...comments) {
        const fragmentHtmls = [];
        let start = 1;
        for (const codeFragment of codeFragments) {
            const { content, end } = codeFragmentToNumberedHtml(language, codeFragment, start);

            fragmentHtmls.push(content);

            start = end;
        }

        const commentHtmls = comments.map(commentToHtml);

        return commentHtmls
            .reduce((acc, curr, index) => acc.concat(curr, fragmentHtmls[index + 1]), [ fragmentHtmls[0] ])
            .join('\n');
    };
};

codeBlockWithNumbering.cell = function codeBlockWithNumberingCell(language) {
    return function wrapper(...args) {
        return html`
            <div class="cell code-block-cell">
                ${codeBlockWithNumbering(language)(...args)}
            </div>
        `;
    };
};

module.exports = {
    codeBlockWithoutNumbering,
    codeBlockWithNumbering
};
