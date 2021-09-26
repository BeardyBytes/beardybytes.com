const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')
const { section, subsection } = require('../../../common/cells/heading')

const cells = [
  md.cell`
A második gyakorlaton, mivel a YouDay miatt elmaradt az előadás, ezért még mindig nyelvekkel és nyelvműveletekkel dolgoztunk. Kivételt jelentett, hogy az óra végén, ízelítőül, megnéztünk egy olyan véges automatát, amely egyszerű email címeket képes „feldolgozni”. 

A gyakorlathoz tartozó feladatsor elérhető a következő linken:

  * [01-nyelvek-feladatsor-2.pdf](./files/01-nyelvek-feladatsor-2.pdf)

`,
  section.cell`Nyelvek, nyelvműveletek`,
  subsection.cell`1. feladat`,
  md.cell`

Lehetséges megoldás, mely nem triviális:

  * $L_{1} = \\{bab\\}$, $L_{2} = \\{babbab\\}$.

Általánosságban, végtelen sok olyan megoldást adhatunk, ami nem triviális, ha szóhatványokkal dolgozunk (a fenti példában $bab^{1}$ és $bab^{2}$).
`,
  subsection.cell`2. feladat`,
  md.cell`
Néhány példa, hogy milyen szavak találhatók az $L$ nyelvben:

  * $ab$,
  * $aabb$,
  * $aaabbb$.

Ismert, hogy nyelvek konkatenációja azt jelenti, hogy vesszük az első nyelv összes szavát és konkatenáljuk a második nyelv minden szavával, azaz

> $L_{1} \\cdot L_{2} = \\{pw \\;|\\; p \\in L_{1}, q \\in L_{2} \\}$.

$L^{2}$ tehát például az alábbi szavakat fogja tartalmazni:

  * $abab$,
  * $abaabb$,
  * $abaaabbb$,
  * $aabbab$.

Azaz, $L^{2}$ szavai

  * $\\{a^{n}b^{n}a^{m}b^{m} \\; | \\; n, m > 0 \\}$

alakúak lesznek.
`,
  subsection.cell`3. feladat`,
  md.cell`
> a. $\\{0, 1\\}^{*}\\{010\\}\\{0, 1\\}^{*}$

> b. $\\{0, 1\\}^{*}\\{000, 111\\}\\{0, 1\\}^{*}$

`,
  subsection.cell`4. feladat`,
  md.cell`
> a. $\\{1\\}\\{0, 1\\}^{*}\\{0\\}$

> b. $\\{0, 1\\}^{*}\\{1\\}\\{0, 1\\}^{*}\\{1\\}\\{0, 1\\}^{*}\\{1\\}\\{0, 1\\}^{*}$

> c. $\\{0, 1\\}^{*}\\{0101\\}\\{0, 1\\}^{*}$

> d. $\\{0, 1\\}\\{0, 1\\}\\{0\\}\\{0, 1\\}^{*}$

> e. $\\{0\\}\\{00, 01, 10, 11\\}^{*} \\cup \\{1\\}\\{0, 1\\}\\{00, 01, 10, 11\\}^{*}$

> g. $\\{\\lambda\\} \\cup \\{0, 1\\} \\cup \\{0, 1\\}\\{0, 1\\} \\cup \\cdots$
`,
]

const meta = {
  order: 2,
  layout: 'practice',
  urlTitle: '02-gyakorlat-nyelvek-nyelvmuveletek-ismet',
  publishedAt: DateTime.local(2021, 9, 20, 8, 0),
  draft: false,
}

const content = {
  title: '2. gyakorlat – Nyelvek, nyelvműveletek, ismét',
  excerpt: 'Az elmaradt előadás okán továbbra is nyelvekkel, nyelvműveletekkel foglalkoztunk.',
  cells,
}

module.exports = {
  meta,
  content,
}
