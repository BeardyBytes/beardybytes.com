const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')
const { section, subsection } = require('../../../common/cells/heading')

const cells = [
  md.cell`
Az első gyakorlaton, a kötelező félév eleji bemutatkozást követően, rövid halmazelméleti ismétléssel kezdtünk, amit nyelvekkel és nyelvműveletekkel kapcsolatos gyakorlás követett. Ebben a bejegyzésben az órai feladatok megoldásai szerepelnek.

A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [01-halmazok-nyelvek-feladatsor.pdf](./files/01-halmazok-nyelvek-feladatsor.pdf)
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

> a. $babab$

> b. $abab$

> c. $ababa$

> d. $babba$
`,
  subsection.cell`4.8 feladat`,
  md.cell`
Vegyük először a véges esetet. Tudjuk, hogy az üres szót önmagával konkatenálva az üres szót kapjuk vissza, azaz $\\lambda \\cdot \\lambda = \\lambda$. Ismerve $L^{*}$ és $L^{+}$ definícióját, ezt a tulajdonságot kihasználva ezek a nyelvek végesek lesznek, ha $L=\\{\\lambda\\}$.

Tekintsük most az üres esetet. Definíció szerint az $L^{*}$ nyelv előállítása mindig tartalmazza az $L^{0}$ nyelvet, mely bármely $L$ nyelv esetén $L^{0} = \\{\\lambda\\}$. Ugyanakkor, mivel $L^{+}$ előállítása során nem használjuk fel az $L^{0}$ halmazt, ezért ha $L = \\emptyset$, akkor $L^{+} = \\emptyset$.
`,
  subsection.cell`4.5 feladat`,
  md.cell`
Ebben a feladatban hasonló a dolgunk, mint a halmazelméletes csoport 1.8 feladatában. Természetes nyelven adott nyelveket kell megadnunk az ismert nyelvműveletek felhasználásával.

> a. $\\{0, 1\\}^{*}\\{11\\}$

> b. $\\{1\\}^{*}{0}\\{1\\}^{*}$
`,
/*
  subsection.cell`További feladatok`,
  md.cell`
Mivel nem jutott rá idő, ezért a 4.4 feladatot a következő gyakorlaton (2020. 09. 16.) fogjuk megoldani.

Házi feladatként szerepelt továbbá a feladatsort záró két feladat, az 1.32 és az 1.36.
`,*/
]

const meta = {
  order: 1,
  layout: 'practice',
  urlTitle: '01-gyakorlat-halmazok-nyelvek',
  publishedAt: DateTime.local(2020, 9, 5, 8, 00),
  draft: false,
}

const content = {
  title: '1. gyakorlat – Halmazok, nyelvek',
  excerpt:
    'Néhány, az ismétlést szolgáló halmazelméleti feladat, majd gyakorlás ábécékkel, nyelvekkel és nyelvműveletekkel.',
  cells,
}

module.exports = {
  meta,
  content,
}
