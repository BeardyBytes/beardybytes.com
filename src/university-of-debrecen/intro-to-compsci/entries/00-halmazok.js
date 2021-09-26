const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')
const { section, subsection } = require('../../../common/cells/heading')

const cells = [
  md.cell`
A nulladik gyakorlaton, a kötelező félév eleji bemutatkozást követően, rövid halmazelméleti ismétléssel kezdtünk. Ebben a bejegyzésben az órai feladatok megoldásai szerepelnek.

A gyakorlathoz tartozó feladatsor elérhető a következő linken:

  * [00-halmazok-feladatsor.pdf](./files/00-halmazok-feladatsor.pdf)

`,
  section.cell`Halmazelmélet`,
  subsection.cell`1.7 feladat`,
  md.cell`
> a. $\\{\\, 2n, -(2n + 1) \\;|\\; n \\in \\mathbb{N} \\,\\}$ vagy $\\{\\, (-1)^{n} \\cdot n \\;|\\; n \\in \\mathbb{N} \\,\\}$
  
> b. $\\{\\, \\{\\,n\\,\\} \\;|\\; n \\in \\mathbb{N} \\,\\}$

> c. $\\{\\, \\{\\,k \\;|\\; k \\leq n \\,\\} \\;|\\; n \\in \\mathbb{N} \\,\\}$

> d. $\\{\\, \\{\\,k \\;|\\; k \\leq 2^{n} - 1 \\,\\} \\;|\\; n \\in \\mathbb{N} \\,\\}$
`,
  subsection.cell`1.8 feladat`,
  md.cell`
A feladat megoldásához egy jó stratégia, ha először készítünk egy Venn-diagramot, mely három halmazt ábrázol ($A, B, C$). Ezt követően, az egyes részfeladatoknál csak besatírozzuk a diagram megfelelő részét, majd formalizáljuk a besatírozott területet előállító kifejezést.

> a. $(A \\cup B) \\setminus (A \\cap B)$

> b. $(A \\cup B \\cup C) \\setminus ((A \\cap B) \\cup (A \\cap C) \\cup (B \\cap C))$

> c. $((A \\cap B) \\cup (A \\cap C) \\cup (B \\cap C))^{\\prime}$

> d. $(A \\cap B) \\cup (A \\cap C) \\cup (B \\cap C) \\cup (A \\cap B \\cap C)^{\\prime}$
`,
  subsection.cell`1.12 feladat`,
  md.cell`
Egyszerűen számoljuk meg a legkülső halmazban szereplő vesszők számát, majd adjunk hozzá egyet. A helyes megoldás ezután: $4$.
`,
  subsection.cell`További feladatok`,
  md.cell`
Ezek csak a gyakorlat után lettek elérhetők, ezért nem oldottuk meg őket.
`,
]

const meta = {
  order: 0,
  layout: 'practice',
  urlTitle: '00-gyakorlat-halmazok',
  publishedAt: DateTime.local(2021, 9, 6, 8, 0),
  draft: false,
}

const content = {
  title: '0. gyakorlat – Halmazok',
  excerpt: 'Néhány, az ismétlést szolgáló halmazelméleti feladat.',
  cells,
}

module.exports = {
  meta,
  content,
}
