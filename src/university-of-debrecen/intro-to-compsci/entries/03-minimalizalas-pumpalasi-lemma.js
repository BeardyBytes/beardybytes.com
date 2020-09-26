const { DateTime } = require('luxon')
const kroki = require('../../../common/cells/kroki')
const md = require('../../../common/cells/markdown')
const { section, subsection, subsubsection } = require('../../../common/cells/heading')

const cells = [
  md.cell`
A gyakorlaton először determinisztikus véges automatákat minimalizáltunk, majd pedig az úgynvezett pumpálási lemma felhasználásával bizonyítottuk nyelvekről, hogy nem regulárisak. Ebben a bejegyzésben az órai feladatok megoldásai mellett megtalálható a minimalizálás algoritmusa, továbbá a pumpálási lemmán alapuló feladatok megoldásának lépései.

A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [03-minimalizalas-pumpalasi-lemma-feladatsor.pdf](./files/03-minimalizalas-pumpalasi-lemma-feladatsor.pdf)
`,
  section.cell`DFA minimalizálás`,
  subsection.cell`A DFA minimalizálás algoritmusa`,
  md.cell`
Ez a feladat még nem automatákkal, hanem nyelvekkel kapcsolatos. Meg kell mondanunk, hogy egy adott egyenlőség igaz-e, ha pedig nem, akkor mutatnunk kell egy ellenpéldát.

> a. Nem teljesül. Ellenpélda: $L_{1} = \\{a\\}$, $L_{2} = \\{b\\}$.

> b. Teljesül.

> c. Teljesül.

> d. Nem teljesül. Ellenpélda: $L_{1} = \\{a\\}$, $L_{2} = \\{aa\\}$.

> e. Nem teljesül. Ellenpélda: $L_{1} = \\{a\\}$, $L_{2} = \\{b\\}$.

> f. Teljesül.
`,
  section.cell`Determinisztikus véges automaták`,
  subsection.cell`2.2 feladat`,
  md.cell`
  Egy jó megközelítés, ha felíunk néhány szót, majd végigkövetjük az automata viselkedését ezekre a szavakra. Ezt követően, a szavak hasonlóságai vagy eltérései alapján már könnyebben megállapíthatjuk, hogy az automata "mit is csinál" pontosan.

> a. Azon szavakból álló nyelv, melyek tartalmazzák az $aaba$ részszót.

> b. Azon szavakból álló nyelv, melyek az $aaba$ részszóra végződnek.

> c. Azon szavakból álló nyelv, melyek az $aaba$ részszóval kezdődnek.

> d. Az üres szó ($\\lambda$), valamint azon szavak, melyek $a$-val kezdődnek és $b$-re végződnek.

> e. Az üres szó ($\\lambda$), valamint azon szavak, melyek $ab$ és $ba$ blokkokból állnak. Azaz $\\{ab, ba\\}^{*}$.
`,
  subsection.cell`2.1 feladat`,
  subsubsection.cell`2.1 a.`,
  kroki.cell('graphviz', 'svg')`
  digraph dfa_21a {
	rankdir=LR;
    size="8,5"
    node [shape = point; color = white ]; S;
	node [shape = doublecircle; color = black]; III;
    node [shape = circle];
    S -> I;
    I -> II [ label = "a" ];
    I -> I [ label = "b" ];
    II -> III [ label = "a" ];
    II -> II [ label = "b" ];
    III -> IV [ label = "a" ];
    III -> III [ label = "b" ];
    IV -> IV [ label = "a, b" ];
}
`,
]

const meta = {
  order: 3,
  layout: 'practice',
  urlTitle: '03-minimalizalas-pumpalasi-lemma',
  publishedAt: DateTime.local(2020, 9, 27, 2, 20),
  draft: false,
}

const content = {
  title: '3. gyakorlat – Minimalizálás, pumpálási lemma',
  excerpt: 'Determinisztikus véges automatákat minimalizáltunk, valamint a pumpálási lemmával bizonyítottuk nyelvekről, hogy nem regulárisak.',
  cells,
}

module.exports = {
  meta,
  content,
}
