const { html } = require('common-tags');
const md = require('../../../common/cells/markdown');
const { codeBlockWithNumbering, codeBlockWithoutNumbering } = require('../../../common/cells/code');

const post = {
    title: 'Hello, World!',
    urlTitle: 'hello-world',
    publishedAt: new Date(2018, 12, 25),
    draft: false,
    excerpt: 'A short description of the post',
    layout: 'post',

    content() {
        const cells = [
            md.cell`# Hello, World!`,
            md.cell`A paragraph of **markdown**.`,
            codeBlockWithNumbering.cell('c')`#include <stdio.h>${md`Needed because of \`printf\`.`}
            int main(int argc, char **argv) {
                printf("Hello, World!");

                return 0;
            }`
        ];

        return cells.join('\n');
    }
};

module.exports = post;
