const { html } = require('common-tags')
const { countLines, highlight } = require('../../common/code')
const { tagConcat } = require('../../util/tag')

const codeFragmentToHtml = (language, codeFragment) => {
  if (codeFragment.trim() == '') {
    return ''
  }

  return html`
    <pre class="language-${language}"><code class="language-${language}">
        ${highlight(language, codeFragment)}
        </code></pre>
  `
}

const createNumberedSpans = (from, count) => {
  const result = []
  for (let i = from; i < from + count; ++i) {
    result.push(`<span>${i}</span>`)
  }
  return result
}

function codeFragmentToNumberedHtml(language, codeFragment, startIndex) {
  if (codeFragment.trim() == '') {
    return {
      content: '',
      end: startIndex,
    }
  }

  const highlightedCode = highlight(language, codeFragment)
  const lineCount = countLines(codeFragment)

  const lineNumberSpans = createNumberedSpans(startIndex, lineCount)

  return {
    content: html`
      <pre class="line-numbers language-${language}"><code class="language-${language}">
            ${highlightedCode}<span class="line-numbers-rows">${lineNumberSpans.join('')}</span>
            </code></pre>
    `,
    end: startIndex + lineCount,
  }
}

const commentToHtml = (comment) => html`
  <div class="code-comment off">
    <div class="toggle on">
      <img src="/resources/img/eye-off-outline.svg" />
    </div>
    <div class="toggle off">
      <img src="/resources/img/eye-outline.svg" />
    </div>
    <div class="description on">
      ${comment}
    </div>
    <div class="description off">
      Click to toggle comment.
    </div>
  </div>
`

const codeBlockWithoutNumbering = (language) => (codeFragments, ...comments) => {
  const fragmentHtmls = codeFragments.map((fragment) => codeFragmentToHtml(language, fragment))
  const commentHtmls = comments.map(commentToHtml)

  return tagConcat(fragmentHtmls, commentHtmls)
}

codeBlockWithoutNumbering.cell = (language) => (...args) => html`
  <div class="cell code-block-cell">
    ${codeBlockWithoutNumbering(language)(...args)}
  </div>
`

const codeBlockWithNumbering = (language) => (codeFragments, ...comments) => {
  const fragmentHtmls = []
  let start = 1
  for (const codeFragment of codeFragments) {
    const { content, end } = codeFragmentToNumberedHtml(language, codeFragment, start)

    fragmentHtmls.push(content)

    start = end
  }

  const commentHtmls = comments.map(commentToHtml)

  return tagConcat(fragmentHtmls, commentHtmls)
}

codeBlockWithNumbering.cell = (language) => (...args) => html`
  <div class="cell code-block-cell">
    ${codeBlockWithNumbering(language)(...args)}
  </div>
`

module.exports = {
  codeBlockWithoutNumbering,
  codeBlockWithNumbering,
}
