const { html } = require('common-tags');
const md = require('../../../common/cells/markdown');

const post = {
    title: 'Hello, World!',
    urlTitle: 'hello-world',
    publishedAt: new Date(2018, 12, 25),
    draft: false,
    excerpt: 'A short description of the post',
    layout: 'post',

    content() {
        const cells = [
            md`# Hello, World!`,
            md`A paragraph of **markdown**.`
        ];

        return cells.join('\n');
    }
};

module.exports = post;
