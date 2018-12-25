const { html } = require('common-tags');

const post = {
    title: 'Hello, World!',
    urlTitle: 'hello-world',
    publishedAt: new Date(2018, 12, 25),
    draft: false,
    excerpt: 'A short description of the post',
    layout: 'post',

    content() {
        return html`
            <h1>Hello, World!</h1>
        `;
    }
};

module.exports = post;
