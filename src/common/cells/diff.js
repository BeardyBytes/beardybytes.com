const { html } = require('common-tags');
const { highlight } = require('../../common/code');
const diff2html = require("diff2html").Diff2Html

const Entries = {
    CONTEXT: 'd2h-cntx',
    DELETION: 'd2h-del',
    HEADER: 'd2h-header',
    INSERTION: 'd2h-ins'
};

const markerMap = {
    [Entries.CONTEXT]: ' ',
    [Entries.DELETION]: '-',
    [Entries.HEADER]: ' ',
    [Entries.INSERTION]: '+'
};

const highlightClassMap = {
    [Entries.CONTEXT]: '',
    [Entries.DELETION]: 'del',
    [Entries.HEADER]: 'header',
    [Entries.INSERTION]: 'ins'
};

const highlightBlock = (language, block) => {
    const code = block.lines.map(line => line.content.substr(1)).join('\n');

    const codeHtml = highlight(language, code);

    return `${block.header}\n${codeHtml};`
};

const extractBlockEntries = block => ([
    {
        content: block.header,
        type: Entries.HEADER
    },
    ...block.lines
]);

const numberedSpans = (property, entries) => entries
    .map(entry => entry[property])
    .map(num => (num === null) || (num == undefined) ? ' ' : num)
    .map(num => `<span>${num}</span>`);

const markEntries = entries => entries
    .map(entry => entry.type)
    .map(type => markerMap[type])
    .map(marker => `<span>${marker}</span>`);

const highlightEntries = entries => entries
    .map(entry => entry.type)
    .map(type => highlightClassMap[type])
    .map(highlight => `<span class="${highlight}"></span>`);

function blocksToHtml(language, blocks) {
    let lines = [];

    const entries = blocks
        .map(extractBlockEntries)
        .reduce((acc, curr) => acc.concat(curr), []);

    const codeHtml = blocks
        .map(block => highlightBlock(language, block))
        .join('\n');

    const oldNumbersRows = numberedSpans('oldNumber', entries).join('');
    const newNumbersRows = numberedSpans('newNumber', entries).join('');
    const markersRows = markEntries(entries).join('');
    const highlightRows = highlightEntries(entries).join(''); 

    return html`
        <div class="diff-highlight-wrapper">
            <pre class="diff language-${language}"><code class="language-${language}">
            ${codeHtml}<span class="old-numbers-rows">${oldNumbersRows}</span><span class="new-numbers-rows">${newNumbersRows}</span><span class="markers-rows">${markersRows}</span>
            </code></pre>
            <div class="diff-highlight-rows">
                ${highlightRows}
            </div>
        </div>
    `;
}

const diffBlock = language => (codeFragments, ...interpolations) => {
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

diffBlock.cell = language => (...args) => html`
    <div class="cell diff-block-cell">
        ${diffBlock(language)(...args)}
    </div>
`;

module.exports = diffBlock;
