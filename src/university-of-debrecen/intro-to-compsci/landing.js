const { html } = require('common-tags')

const POST_DATE_FORMAT = 'LL. dd.'

const TITLE = 'Az informatika számítástudományi alapjai'
const DESCRIPTION = 'A DE Informatikai Karán Bagossy Attila által tartott gyakorlatok anyagai.'

const elements = {
  navigationInSeries(entry) {
    return `
    ${elements.previousInSeries(entry)}
    <div class="cell series-cell">
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
  head({ url }) {
    return html`
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />

      <title>${TITLE}</title>

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="description" content="${DESCRIPTION}" />

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
      <meta property="og:title" content="${TITLE}" />
      <meta property="og:description" content="${DESCRIPTION}" />
      <meta property="og:url" content="${url}" />
      <meta property="og:image" content="https://beardybytes.com/og-image.jpg" />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans|IBM+Plex+Serif&display=swap"
      />

      <link rel="stylesheet" href="/resources/css/normalize.css" />
      <link rel="stylesheet" href="css/landing.css" />
    `
  },
}

function entryToItem(entry) {
  return html`
    <a href="${entry.meta.urlTitle}.html" class="entry">
      <div class="entry-date">
        ${entry.meta.publishedAt.toFormat(POST_DATE_FORMAT)}
      </div>
      <div class="entry-content">
        <div class="entry-title">
          ${entry.content.title}
        </div>
        <div class="entry-excerpt">
          ${entry.content.excerpt}
        </div>
      </div>
    </a>
  `
}

const landingToHtml = (context) => html`
  <!DOCTYPE html>
  <html>
    <head>
      ${elements.head({
        url: `${context.siteBaseUrl}/${context.baseUrl}/index.html`,
      })}
    </head>

    <body>
      <div class="site">
        <div class="top-menu">
          <div class="logo-block">
            ${require('../../common/logo')(context, { variant: 'text', inlineSVG: true, optimizeSVG: true })}
          </div>
        </div>
        <div class="post-title">
          <div>
            <h2>DE Informatikai Kar, 2020/2021/1</h2>
            <h1>Az informatika számítástudományi alapjai</h1>
            <div class="post-date">Szerda 8-10, 10-12</div>
          </div>
        </div>
        ${context.entries.map(entryToItem).join('\n')}
      </div>
    </body>
  </html>
`

module.exports = (context) => ({
  url: `${context.baseUrl}/index.html`,
  content: landingToHtml(context),
})
