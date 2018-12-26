const { html } = require('common-tags');
const Prism = require('prismjs');
const diff2html = require("diff2html").Diff2Html

const normalizeWhitespace = (function loadNormalizer() {
    require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');

    return Prism.plugins.NormalizeWhitespace;
})();

const loadLanguages = require('prismjs/components/');
loadLanguages(['java', 'c', 'cpp']);

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

function diffBlockToHtml(language, block) {
    const text = block.lines.map(line => line.content.substr(1)).join('\n');

    

    const normalizedCode = normalizeWhitespace.normalize(text);
    const codeHtml = Prism.highlight(normalizedCode, Prism.languages[language], language);

    const markerMap = {
        'd2h-del': '-',
        'd2h-ins': '+',
        'd2h-cntx': ' '
    };

    const highlightMap = {
        'd2h-del': 'del',
        'd2h-ins': 'ins',
        'd2h-cntx': ''
    };

    console.log(block.header);

    const oldNumbers = block.lines
        .map(line => line.oldNumber)
        .map(num => num === null ? ' ' : num)
        .map(num => `<span>${num}</span>`);
    const newNumbers = block.lines
        .map(line => line.newNumber)
        .map(num => num === null ? ' ' : num)
        .map(num => `<span>${num}</span>`);
    const markers = block.lines
        .map(line => line.type)
        .map(type => markerMap[type])
        .map(marker => `<span>${marker}</span>`);
    const highlight = block.lines
        .map(line => line.type)
        .map(type => highlightMap[type])
        .map(highlight => `<span class="${highlight}"></span>`);

    return html`
        <div class="diff-highlight-wrapper">
            <pre class="diff language-${language}"><code class="language-${language}">
            ${codeHtml}<span class="old-numbers-rows">${oldNumbers.join('')}</span><span class="new-numbers-rows">${newNumbers.join('')}</span><span class="markers-rows">${markers.join('')}</span><span class="header">${block.header}</span>
            </code></pre>
            <div class="diff-highlight-rows">
                ${highlight.join('\n')}
            </div>
        </div>
    `;
}

const diffBlock = function diffBlock(language) {
    return function tag(codeFragments, ...interpolations) {
        const text = interpolations.reduce((acc, curr, index) => acc + curr + codeFragments[index + 1], codeFragments[0]);

        const diffJson = diff2html.getJsonFromDiff(text, {
            inputFormat: 'diff',
            outputFormat: 'line-by-line',
            showFiles: false,
            matching: 'lines'
        });

        const blocks = diffJson[0].blocks.map(block => diffBlockToHtml(language, block)).join('\n');

        return html`
            <div class="diff-block">
                ${blocks}
            </div>
        `;
    };
};

diffBlock.cell = function diffBlockCell(language) {
    return function wrapper(...args) {
        return html`
            <div class="cell diff-block-cell">
                ${diffBlock(language)(...args)}
            </div>
        `;
    };
};

module.exports = diffBlock;
