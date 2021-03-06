const { html } = require('common-tags')

const renderCells = require('../../../common/cells/render')

const POST_DATE_FORMAT = 'yyyy. LL. dd.'

const elements = {
  navigationInSeries(entry, isStarting) {
    const classList = ['cell', 'series-cell']

    if (isStarting) {
      classList.push('series-starting-cell')
    }

    return `
    ${elements.previousInSeries(entry)}
    <div class="${classList.join(' ')}">
    Ez a bejegyzés <a href="index.html">${
      entry.meta.series.title
    }</a> sorozat része, mely az azonos nevű tárgyhoz kapcsolódó anyagokat tartalmaz.
    </div>
    ${elements.nextInSeries(entry)}
    `
  },
  previousInSeries(entry) {
    if (!entry.meta.previous) {
      return '<div class="in-series-previous"></div>'
    }

    return `
    <a href="${entry.meta.previous.meta.urlTitle}.html" class="in-series-previous">
      <div class="note">Előző bejegyzés</div>
      <div class="title">${entry.meta.previous.content.title}</div>
    </a>
    `
  },
  nextInSeries(entry) {
    if (!entry.meta.next) {
      return '<div class="in-series-next"></div>'
    }

    return `
    <a href="${entry.meta.next.meta.urlTitle}.html" class="in-series-next">
      <div class="note">Következő bejegyzés</div>
      <div class="title">${entry.meta.next.content.title}</div>
    </a>
    `
  },
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
      <link rel="stylesheet" href="css/practice.css" />

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

const entryToHtml = async (entry, context) => html`
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
        <div class="hero">
          <div class="hero-content">
            <div class="top-menu">
              <div class="logo-block">
                ${require('../../../common/logo')(context, { variant: 'text', inlineSVG: true, optimizeSVG: true })}
              </div>
            </div>
            <div class="post-title">
              <div>
                <h2>${entry.meta.series.title}</h2>
                <h1>${entry.content.title}</h1>
                <div class="post-date">${entry.meta.publishedAt.toFormat(POST_DATE_FORMAT)}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="post-content">
          ${elements.navigationInSeries(entry, true)} ${await renderCells(entry.content.cells)}
          ${elements.navigationInSeries(entry, false)}
        </div>
        ${elements.footer()}
      </div>

      <script type="text/javascript" src="/resources/script/refactoring-posts.js"></script>
    </body>
  </html>
`

const process = async (entry, context) => ({
  emit: [
    {
      url: `${entry.meta.url}.html`,
      content: await entryToHtml(entry, context),
    },
  ],
})

module.exports = {
  name: 'practice',
  process,
}
