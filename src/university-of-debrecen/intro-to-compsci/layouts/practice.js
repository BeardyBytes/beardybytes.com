const { html } = require('common-tags')

const POST_DATE_FORMAT = 'LLLL dd, y'

const elements = {
  head({ title }) {
    return html`
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />

      <title>${title}</title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans|IBM+Plex+Serif"
      />

      <link rel="stylesheet" href="/resources/css/normalize.css" />
      <link rel="stylesheet" href="/resources/css/main.css" />
    `
  },
  header() {
    return html` <div class="top-menu"></div> `
  },
  footer() {
    return html``
  },
}

const entryToHtml = (entry) => html`
  <!DOCTYPE html>
  <html>
    <head>
      ${elements.head({ title: entry.content.title })}
    </head>

    <body>
      <div class="site">
        ${elements.header()}
        <div class="post-content">
          <div class="cell title-cell">
            <h1>${entry.meta.series.title}</h1>
            <h2>${entry.content.title}</h2>
            <div class="post-date">Posted at ${entry.meta.publishedAt.toFormat(POST_DATE_FORMAT)}.</div>
          </div>
          <!-- Insert title and date -->

          ${entry.content.cells.join('\n')}

          <!-- Insert previous and next -->
        </div>
        ${elements.footer()}
      </div>

      <script type="text/javascript" src="/resources/script/refactoring-posts.js"></script>
    </body>
  </html>
`

const process = (entry) => ({
  emit: [
    {
      url: `${entry.meta.url}.html`,
      content: entryToHtml(entry),
    },
  ],
})

module.exports = {
  name: 'practice',
  process,
}
