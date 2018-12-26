const { html } = require('common-tags');

module.exports = {
    section: {
        cell: fragments => html`
            <div class="cell section-header-cell">
                <h3>${fragments[0]}</h3>
            </div>
        `
    },
    subsection: {
        cell: fragments => html`
            <div class="cell subsection-header-cell">
                <h4>${fragments[0]}</h4>
            </div>
        `
    },
    subsubsection: {
        cell: fragments => html`
            <div class="cell subsubsection-header-cell">
                <h5>${fragments[0]}</h5>
            </div>
        `
    }
}
