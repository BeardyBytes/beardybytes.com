const { html } = require('common-tags')

const content = (context) => html`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>Beardy Bytes - Attila Bagossy Software Engineer</title>
      <!--
    TODO:
        Description from global context.
    -->
      <meta name="description" content"">

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#23407a" />
      <meta name="apple-mobile-web-app-title" content="Beardy Bytes" />
      <meta name="application-name" content="Beardy Bytes" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />

      <meta property="og:image:height" content="1274" />
      <meta property="og:image:width" content="849" />
      <meta property="og:title" content="Beardy Bytes" />
      <meta property="og:description" content="The Open Graph Description" />
      <meta property="og:url" content="https://beardybytes.com" />
      <meta property="og:image" content="https://beardybytes.com/og-image.jpg" />

      <!--
    TODO:
        Canonical link from global context.
    -->
      <link rel="canonical" href="" />

      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=IBM+Plex+Serif" />

      <link rel="stylesheet" href="/resources/css/normalize.css" />

      ${require('./style')(context, { inline: true })}
    </head>
    <body>
      <div class="barber-bar stripes"></div>
      <main>
        <div class="top-padding-block"></div>
        <div class="logo-block flex-center">
          <!--<img src="/resources/img/beardy-bytes-logo.svg">-->
          ${require('../common/logo')(context, { variant: 'text', inlineSVG: true, optimizeSVG: true })}
        </div>
        <div class="welcome-text-block flex-center">
          <div class="welcome-text">
            <h1>
              Hi! I'm Attila Bagossy
              <span class="stuff-i-do"> and I develop software. </span>
            </h1>
          </div>
        </div>
        <div class="nav-block">
          <nav class="flex-center">
            <div>
              <a href="#">About Me</a>
              <a href="#">Blog</a>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
            </div>
          </nav>
        </div>
      </main>
      <div class="barber-bar stripes"></div>
      <div class="clear"></div>

      ${require('./script')(context, { inline: true })}
    </body>
  </html>
`

const url = 'index.html'

module.exports = function landing(context) {
  context.emit.push({
    content: content(context),
    url: `${context.baseUrl}/${url}`,
  })
}
