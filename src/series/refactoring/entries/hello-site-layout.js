const { html } = require('common-tags')
const { DateTime } = require('luxon')

const meta = {
  order: 2,
  layout: 'site',
  publishedAt: DateTime.local(),
  urlTitle: 'hello-site-layout',
  draft: false,
}

const comments = [
  {
    title: 'The Humble Beginnings',
    locations: [
      {
        type: 'line',
        jumpTo: 70,
        content: '70-90',
      },
    ],
    content: html`<p>Step content</p>`,
  },
]

const commit = {
  url: 'https://github.com/battila7/jield/commit/de45b0baa4cab47ba922ce91bf4ff9e6306a9df0',
  hash: 'de45b0b',
  message: 'Transformation of foreach loops added',
  language: 'c',
  code: `
    #include <stdio.h>

    int main(int argc, char **argv) {
        printf("Hello, World!");

        return 0;
    }
    `,
  diffFirst: null,
  diffPrevious: null,
  comments,
}

const commits = [commit]

const content = {
  title: 'Hello, Site Layout',
  description: html`<p>Description</p>`,
  excerpt: 'Excerpt',
  commits,
}

module.exports = () => ({ meta, content })
