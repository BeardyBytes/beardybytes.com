const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')
const { section, subsection, subsubsection } = require('../../../common/cells/heading')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [11-kornyezetfuggetlen-nyelvek-veremautomatak-feladatsor.pdf](./files/11-kornyezetfuggetlen-nyelvek-veremautomatak-feladatsor.pdf)
`,
  subsection.cell`3. feladat`,
  subsubsection.cell`3. b)`,
  md.cell`<img src="files/11-3-b.svg" >`,
  subsubsection.cell`3. c)`,
  md.cell`<img src="files/11-3-c.svg" >`,

  subsection.cell`5. feladat`,
  subsubsection.cell`5. a)`,
  md.cell`<img src="files/11-5-a.svg" >`,
  subsubsection.cell`5. b)`,
  md.cell`<img src="files/11-5-b.svg" >`,

  section.cell`Top-down és bottom-up veremautomaták általánosan`,
  subsection.cell`Top-down veremautoma`,
  md.cell`<img src="files/11-top-down.svg" >`,
  subsection.cell`Bottom-up veremautoma`,
  md.cell`<img src="files/11-bottom-up.svg" >`,

  subsection.cell`4.feladat`,
  subsubsection.cell`4. a)`,
  md.cell`<img src="files/11-4-a.svg" >`,
  subsubsection.cell`4. b)`,
  md.cell`<img src="files/11-4-b.svg" >`,

  subsection.cell`5.30. feladat`,
  md.cell`<img src="files/11-5-30.svg" >`,

  subsection.cell`5.31. feladat`,
  md.cell`<img src="files/11-5-31.svg" >`,
  subsubsection.cell`5.31. a)`,
  md.cell`
A következő konfiguráció:

$$
(q_{0}, [\\:a\\:]\\:], +S\\:[\\:Z_{0})
$$
`,
  subsubsection.cell`5.31. b)`,
  md.cell`
A következő konfiguráció:

$$
(q_{0}, +\\:[\\:a\\:]\\:], S\\:[\\:Z_{0})
$$
`,
]

const meta = {
  order: 11,
  layout: 'practice',
  urlTitle: '11-kornyezetfuggetlen-nyelvek-veremautomatak',
  publishedAt: DateTime.local(2021, 11, 22, 8, 10),
  draft: false,
}

const content = {
  title: '11. gyakorlat – Környezetfüggetlen nyelvek, veremautomaták',
  excerpt:
    'Ezen a gyakorlaton részletesebben foglalkozunk a veremautomaták és a környezetfüggetlen nyelvek kapcsolatával.',
  cells,
}

module.exports = {
  meta,
  content,
}
