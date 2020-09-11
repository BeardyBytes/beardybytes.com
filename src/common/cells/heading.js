const { html } = require('common-tags')
const slug = require('slug')

function makeHeadingWithLink(title, clazz, header) {
  const identifier = slug(title)

  return html`
        <div class="cell ${clazz}" id="${identifier}">
            <a href="#${identifier}">
                <${header}>${title}</${header}>
            </a>
            <div class="header-link">
                <a href="#${identifier}">
                    <img src="/resources/img/link-2-outline.svg">
                </a>
            </div>
        </div>
    `
}

function makeHeadingWithoutLink(title, clazz, header) {
  return html`
        <div class="cell ${clazz}">
            <${header}>${title}</${header}>
        </div>
    `
}

module.exports = {
  section: {
    cell: (fragments) => makeHeadingWithLink(fragments[0], 'section-header-cell', 'h3'),
  },
  subsection: {
    cell: (fragments) => makeHeadingWithLink(fragments[0], 'subsection-header-cell', 'h4'),
  },
  subsubsection: {
    cell: (fragments) => makeHeadingWithoutLink(fragments[0], 'subsubsection-header-cell', 'h5'),
  },
}
