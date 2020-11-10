const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [09-pumpalasi-lemma-kornyezetfuggetlen-nyelvekre-veremautomatak-feladatsor.pdf](./files/09-pumpalasi-lemma-kornyezetfuggetlen-nyelvekre-veremautomatak-feladatsor.pdf)
`,
]

const meta = {
  order: 9,
  layout: 'practice',
  urlTitle: '09-pumpalasi-lemma-kornyezetfuggetlen-nyelvekre-veremautomatak',
  publishedAt: DateTime.local(2020, 11, 10, 20, 0),
  draft: false,
}

const content = {
  title: '9. gyakorlat – Pumpálási lemma környezetfüggetlen nyelvekre, veremautomaták',
  excerpt:
    'A környezetfüggetlen nyelvekre vonatkozó pumpálási lemmát alkalmazva megmutatjuk nyelvekről, hogy nem lehet őket környezetfüggetlen grammatikával generálni. A gyakorlat második felében pedig egy új típusú automatával, a veremautomatával foglalkozunk.',
  cells,
}

module.exports = {
  meta,
  content,
}
