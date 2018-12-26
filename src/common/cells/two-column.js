const { html } = require('common-tags');



module.exports = {
    cell: ({ left, right, options = {} }) => {
        const classes = ['cell', 'two-column-cell'];

        if (options.sticky) {
            classes.push('sticky');
        }

        if (options.oversize) {
            classes.push('oversize');
        }

        return html`
            <div class="${classes.join(' ')}">
                <div class="left">
                    ${left}
                </div>
                <div class="right">
                    ${right}
                </div>
                <div class="clear"></div>
            </div>
        `;
    }
};
