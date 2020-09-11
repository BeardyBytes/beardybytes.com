const { readdirSync } = require('fs')

const css = [
  'css/main.css',
  'css/normalize.css',

  'css/refactoring/main.css',
  'css/refactoring/code/prism.css',
  'css/refactoring/code/diff.css',

  'css/code/code-comment.css',
  'css/code/diff.css',
  'css/code/line-numbers.css',
  'css/code/prism.css',
]

const img = [
  'img/eye-outline.svg',
  'img/eye-off-outline.svg',
  'img/link-2-outline.svg',

  'img/arrow-ios-back-outline.svg',
  'img/arrow-ios-forward-outline.svg',
  'img/message-square-outline.svg',
  'img/code-outline.svg',
  'img/home-outline.svg',
]

const script = ['script/refactoring-posts.js', 'script/refactoring-site.js']

function toCopyable(baseUrl, entry) {
  return {
    source: `${__dirname}/${entry}`,
    destination: `${baseUrl}/${entry}`,
  }
}

function addRobotsTxt(context) {
  context.copy.push({
    source: `${__dirname}/misc/robots.txt`,
    destination: 'robots.txt',
  })
}

function addFavicon(context) {
  const baseDir = `${__dirname}/misc/favicon`

  readdirSync(baseDir).forEach((file) => {
    context.copy.push({
      source: `${baseDir}/${file}`,
      destination: file,
    })
  })
}

function addOpenGraphImage(context) {
  context.copy.push({
    source: `${__dirname}/misc/og-image.jpg`,
    destination: 'og-image.jpg',
  })
}

module.exports = function resources(context) {
  const copyToBase = toCopyable.bind(null, context.baseUrl)

  ;[css, img, script]
    .reduce((acc, curr) => acc.concat(curr), [])
    .map(copyToBase)
    .forEach((copy) => context.copy.push(copy))

  addRobotsTxt(context)

  addFavicon(context)

  addOpenGraphImage(context)
}
