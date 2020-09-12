const { html } = require('common-tags')

const POST_DATE_FORMAT = 'LLLL dd, y'

const elements = {
  head({ title, description, url }) {
    return html`
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />

      <title>${title}</title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="description" content="${description}" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#23407a" />
      <meta name="theme-color" content="#ffffff" />

      <meta property="og:image:height" content="1274" />
      <meta property="og:image:width" content="849" />
      <meta property="og:site_name" content="Beardy Bytes" />
      <meta property="og:locale" content="hu_HU" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:url" content="${url}" />
      <meta property="og:image" content="https://beardybytes.com/og-image.jpg" />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans|IBM+Plex+Serif&display=swap"
      />

      <link rel="stylesheet" href="/resources/css/normalize.css" />
      <link rel="stylesheet" href="/resources/css/main.css" />

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
        integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
        crossorigin="anonymous"
      />
    `
  },
  header() {
    return html` <div class="top-menu"></div> `
  },
  footer() {
    return html``
  },
}

const entryToHtml = (entry, context) => html`
  <!DOCTYPE html>
  <html>
    <head>
      ${elements.head({
        title: `${entry.meta.series.title} – ${entry.content.title}`,
        description: entry.content.excerpt,
        url: `${context.siteBaseUrl}/${entry.meta.url}.html`,
      })}
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

const process = (entry, context) => ({
  emit: [
    {
      url: `${entry.meta.url}.html`,
      content: entryToHtml(entry, context),
    },
  ],
})

module.exports = {
  name: 'practice',
  process,
}
