const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')
const { section, subsection } = require('../../../common/cells/heading')

const cells = [
  md.cell`
Az első gyakorlaton már belevágtunk a félév igazi anyagába, ami nyelvekkel és nyelvműveletekkel kapcsolatos gyakorlás jelentett. Ebben a bejegyzésben az órai feladatok megoldásai szerepelnek.

A gyakorlathoz tartozó feladatsor elérhetők a következő linken:

  * [01-nyelvek-feladatsor.pdf](./files/01-nyelvek-feladatsor.pdf)

`,
  section.cell`Nyelvek, nyelvműveletek`,
  subsection.cell`4.3 feladat`,
  md.cell`
A megoldás során csupán behelyettesítjük $V$ és $W$ helyére a megfelelő, általuk jelölt nyelveket, majd elvégezzük a kijelölt műveleteket.

> a. $\\{0, 1 \\}^{*}$

> b. $\\{ 01 \\}^{*}$

> c. $\\{ 0 \\}^{*}\\{ 1 \\}^{*}$

> d. $\\{ 0, 1 \\}^{*}\\{ 01 \\}$
`,
  subsection.cell`Mondjunk olyan szavakat... feladat`,
  md.cell`
Először keressünk egy olyan szót, mely része a megfelelő nyelvnek, majd konkatenációval bővítsük ezt a szót úgy, hogy elrontsuk, azaz már ne legyen része a megfelelő nyelvnek.

> a. $babaab$

> b. $abab$

> c. $ababba$

> d. $babba$
`,
  subsection.cell`4.8 feladat`,
  md.cell`
Vegyük először a véges esetet. Tudjuk, hogy az üres szót önmagával konkatenálva az üres szót kapjuk vissza, azaz $\\lambda \\cdot \\lambda = \\lambda$. Ismerve $L^{*}$ és $L^{+}$ definícióját, ezt a tulajdonságot kihasználva ezek a nyelvek végesek lesznek, ha $L=\\{\\lambda\\}$.

Tekintsük most az üres esetet. Definíció szerint az $L^{*}$ nyelv előállítása mindig tartalmazza az $L^{0}$ nyelvet, mely bármely $L$ nyelv esetén $L^{0} = \\{\\lambda\\}$. Ugyanakkor, mivel $L^{+}$ előállítása során nem használjuk fel az $L^{0}$ halmazt, ezért ha $L = \\emptyset$, akkor $L^{+} = \\emptyset$.
`,
  subsection.cell`4.5 feladat`,
  md.cell`
Ebben a feladatban hasonló a dolgunk, mint a halmazelméletes feladatsor 1.8 feladatában. Természetes nyelven adott nyelveket kell megadnunk az ismert nyelvműveletek felhasználásával.

> a. $\\{0, 1\\}^{*}\\{11\\}$

> b. $\\{1\\}^{*}{0}\\{1\\}^{*}$
`,
  subsection.cell`4.4 feladat`,
  md.cell`
Jó stratégia, ha visszalapozunk, és segítségül felidézzük a nyelvműveletek azonosságait.

> a. Nem teljesül, ellenpélda: $L_{1} = \\{a\\}$, $L_{2} = \\{b\\}$.

> b. Teljesül.

> c. Teljesül.

> d. Nem teljesül, ellenpélda: $L_{1} = \\{a\\}$, $L_{2} = \\{aa\\}$.

> e. Nem teljesül, ellenpélda: $L_{1} = \\{a\\}$, $L_{2} = \\{b\\}$.

> f. Nem teljesül, ellenpélda: $L_{1} = \\{a, aa\\}$, $L_{2} = \\{ab\\}$, $L_{3} = \\{b\\}$.
`,
]

const meta = {
  order: 1,
  layout: 'practice',
  urlTitle: '01-gyakorlat-nyelvek-nyelvmuveletek',
  publishedAt: DateTime.local(2021, 9, 13, 8, 0),
  draft: false,
}

const content = {
  title: '1. gyakorlat – Nyelvek, nyelvműveletek',
  excerpt: 'Gyakorlás ábécékkel, nyelvekkel és nyelvműveletekkel.',
  cells,
}

module.exports = {
  meta,
  content,
}
