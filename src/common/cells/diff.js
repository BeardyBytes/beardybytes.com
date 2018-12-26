const { html } = require('common-tags');
const Prism = require('prismjs');
const diff2html = require("diff2html").Diff2Html

const normalizeWhitespace = (function loadNormalizer() {
    require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');

    return Prism.plugins.NormalizeWhitespace;
})();

const loadLanguages = require('prismjs/components/');
loadLanguages(['java', 'c', 'cpp']);


function blocksToHtml(language, blocks) {
    let lines = [];

    blocks.forEach(block => {
        lines.push({ 
            content: block.header,
            type: 'd2h-header'
        });

        lines = lines.concat(block.lines);
    });

    const codeHtml = blocks.map(block => {
        const text = block.lines.map(line => line.content.substr(1)).join('\n');

        const normalizedCode = normalizeWhitespace.normalize(text);
        const blockHtml = Prism.highlight(normalizedCode, Prism.languages[language], language);

        return `${block.header}\n${blockHtml};`
    }).join('\n');

    const markerMap = {
        'd2h-del': '-',
        'd2h-ins': '+',
        'd2h-cntx': ' ',
        'd2h-header': ' ',
    };

    const highlightMap = {
        'd2h-del': 'del',
        'd2h-ins': 'ins',
        'd2h-header': 'header',
        'd2h-cntx': ''
    };

    const oldNumbers = lines
        .map(line => line.oldNumber)
        .map(num => (num === null) || (num == undefined) ? ' ' : num)
        .map(num => `<span>${num}</span>`);
    const newNumbers = lines
        .map(line => line.newNumber)
        .map(num => (num === null) || (num == undefined) ? ' ' : num)
        .map(num => `<span>${num}</span>`);
    const markers = lines
        .map(line => line.type)
        .map(type => markerMap[type])
        .map(marker => `<span>${marker}</span>`);
    const highlight = lines
        .map(line => line.type)
        .map(type => highlightMap[type])
        .map(highlight => `<span class="${highlight}"></span>`);

    return html`
        <div class="diff-highlight-wrapper">
            <pre class="diff language-${language}"><code class="language-${language}">
            ${codeHtml}<span class="old-numbers-rows">${oldNumbers.join('')}</span><span class="new-numbers-rows">${newNumbers.join('')}</span><span class="markers-rows">${markers.join('')}</span>
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

        const blocks = blocksToHtml(language, diffJson[0].blocks);

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
