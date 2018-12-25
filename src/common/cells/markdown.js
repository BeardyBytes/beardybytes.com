const { html } = require('common-tags');
const Remarkable = require('remarkable');

const remarkableOptions = {};

const renderer = new Remarkable(remarkableOptions);

module.exports = function md(fragments, ...interpolations) {
    const text = interpolations.reduce((acc, curr, index) => acc + curr + fragments[index + 1], fragments[0]);

    const rendered = renderer.render(text);

    return html`
        <div class="cell md-cell">
            ${rendered}
        </div>
    `;
};
