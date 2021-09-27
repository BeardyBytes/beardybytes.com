const { DateTime } = require('luxon')
const kroki = require('../../../common/cells/kroki')
const md = require('../../../common/cells/markdown')
const { section, subsection, subsubsection } = require('../../../common/cells/heading')

const cells = [
  md.cell`
A gyakorlat elején „ránézésre” próbáltuk megmondani, hogy egy-egy automata milyen szavakat fogad el, majd pedig determinisztikus véges automatákat rajzoltunk adott nyelvekhez. Ebben a bejegyzésben az órai feladatok megoldásai szerepelnek.

A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [03-determinisztikus-veges-automatak-feladatsor.pdf](./files/03-determinisztikus-veges-automatak-feladatsor.pdf)
`,
  section.cell`Determinisztikus véges automaták`,
  subsection.cell`2.2 feladat`,
  md.cell`
  Egy jó megközelítés, ha felírunk néhány szót, majd végigkövetjük az automata viselkedését ezekre a szavakra. Ezt követően, a szavak hasonlóságai vagy eltérései alapján már könnyebben megállapíthatjuk, hogy az automata „mit is csinál” pontosan.

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
  subsubsection.cell`2.1 b.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_21b {
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
  III -> III [ label = "a, b" ];
}
`,
  subsubsection.cell`2.1 c.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_21c {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; I II;
  node [shape = circle];
  S -> I;
  I -> II [ label = "a" ];
  I -> I [ label = "b" ];
  II -> III [ label = "b" ];
  II -> II [ label = "a" ];
  III -> II [ label = "a" ];
  III -> I [ label = "b" ];
}
`,
  subsubsection.cell`2.1 e.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_21e {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; I II;
  node [shape = circle];
  S -> I;
  I -> II [ label = "a" ];
  I -> I [ label = "b" ];
  II -> III [ label = "a" ];
  II -> I [ label = "b" ];
  III -> III [ label = "a, b" ];
}
`,
  subsubsection.cell`2.1 f.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_21f {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; I;
  node [shape = circle];
  S -> I;
  I -> II [ label = "a" ];
  I -> I [ label = "b" ];
  II -> I [ label = "a" ];
  II -> II [ label = "b" ];
}
`,
  subsubsection.cell`2.1 g.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_21g {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; I;
  node [shape = circle];
  S -> I;
  I -> II [ label = "a" ];
  II -> I [ label = "a"];
  I -> III [ label = "b" ];
  III -> I [ label = "b"];
  II -> IV [ label = "b" ];
  IV -> II [ label = "b"];
  III -> IV [ label = "a" ];
  IV -> III [ label = "a"];
}
`,
  subsubsection.cell`2.1 h.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_21h {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; I II III IV;
  node [shape = circle];
  S -> I;
  I -> II [ label = "a" ];
  I -> I [ label = "b" ];
  II -> I [ label = "b" ];
  II -> III [ label = "a" ];
  III -> IV [ label = "b" ];
  IV -> III [ label = "a" ];
  IV -> IV [ label = "b"];
  III -> V [ label = "a" ];
  V -> V [ label = "a, b" ];
}
`,
  subsubsection.cell`2.1 i.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_21i {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; I;
  node [shape = circle];
  S -> I;
  I -> II [ label = "a" ];
  I -> I [ label = "b" ];
  II -> III [ label = "a" ];
  III -> III [ label = "a,b" ];
  II -> IV [ label = "b" ];
  IV -> III [ label = "a" ];
  IV -> I [ label = "b" ];
}
`,
  subsubsection.cell`2.1 j.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_21j {
  rankdir=LR;
  size="12,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; VI XI;
  node [shape = circle];
  S -> I;
  I -> II [ label = "b" ];
  II -> III [ label = "b" ];
  III -> III [ label = "b" ];
  III -> IV [ label = "a" ];
  IV -> IV [ label = "a" ];
  IV -> V [ label = "b" ];
  V -> III [ label = "b" ];
  V -> VI [ label = "a" ];
  VI -> VI [ label = "a,b" ];

  I -> VII [ label = "a" ];
  II -> VII [ label = "a" ];
  VII -> VIII  [ label = "b" ];
  VIII -> III [ label = "b" ];
  VIII -> IX [ label = "a" ];
  IX -> IX [ label = "a" ];
  IX -> X [ label = "b" ];
  X -> IX [ label = "a" ];
  X -> XI [ label = "b" ];
  XI -> XI [ label = "a, b" ];
}
`,
  subsection.cell`2.12 feladat`,
  md.cell`
A gyakorlaton ezzel a feladattal nem foglalkoztunk, de otthon mindenképpen érdemes megoldani akár az összes részfeladatot. A tanulságosabb részfeladatokat ismétléként áttekintjük majd a következő gyakorlaton.
`,
  subsubsection.cell`2.12 a.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_212a {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; II;
  node [shape = circle];
  S -> I;
  I -> II [ label = "a" ];
  I -> I [ label = "b" ];
  II -> I [ label = "b" ];
  II -> II [ label = "a" ];
}
`,
  subsubsection.cell`2.12 b.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_212b {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; I;
  node [shape = circle];
  S -> I;
  I -> II [ label = "b" ];
  I -> III [ label = "a" ];
  II -> I [ label = "a, b" ];
  III -> III [ label = "a, b" ];
}
`,
  subsubsection.cell`2.12 c.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_212c {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; II;
  node [shape = circle];
  S -> I;
  I -> II [ label = "b" ];
  I -> III [ label = "a" ];
  II -> II [ label = "a, b" ];
  III -> II [ label = "a, b" ];
}
`,
  subsubsection.cell`2.12 d.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_212d {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; II;
  node [shape = circle];
  S -> I;
  I -> II [ label = "a" ];
  I -> III [ label = "b" ];
  III -> IV [ label = "a" ];
  IV -> I [ label = "a" ];
  III -> V [ label = "b" ];
  V -> I [ label = "b" ];
}
`,
  subsubsection.cell`2.12 e.`,
  md.cell`
  Bezárójelezve a kifejezést, a következőt kapjuk:

  $$
  (\\{a\\} \\cup \\{b\\}\\{a\\}^{*}) \\cup (\\{a\\}\\{b\\}^{*}\\{a\\})
  $$
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_212e {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; II III V;
  node [shape = circle];
  S -> I;
  I -> II [ label = "a" ];
  II -> III [ label = "a" ];
  II -> IV [ label = "b" ];
  IV -> III [ label = "a" ];
  IV -> IV [ label = "b" ];
  I -> V [ label = "b" ];
  V -> V [ label = "a" ];
}
`,
  subsubsection.cell`2.12 f.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_212f {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; IV VI;
  node [shape = circle];
  S -> I;
  I -> II [ label = "a" ];
  II -> IV [ label = "b" ];
  II -> II [ label = "a" ];
  IV -> II [ label = "a" ];
  IV -> V [ label = "b" ];
  I -> III [ label = "b" ];
  III -> V [ label = "b" ];
  III -> II [ label = "a" ];
  V -> V [ label = "b" ];
  V -> VI [ label = "a" ];
  VI -> IV [ label = "b" ];
  VI -> II [ label = "a" ];
}
`,
  subsubsection.cell`2.12 g.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_212g {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; III V;
  node [shape = circle];
  S -> I;
  I -> II [ label = "b" ];
  I -> III [ label = "a" ];
  II -> III [ label = "a" ];
  II -> IV [ label = "b" ];
  IV -> IV [ label = "b" ];
  IV -> V [ label = "a" ];
  V -> II [ label = "b"];
  V -> III [ label = "a" ];
}
`,
  subsubsection.cell`2.12 h.`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_212h {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; I V;
  node [shape = circle];
  S -> I;
  I -> II [ label = "a" ];
  I -> IV [ label = "b" ];
  II -> I [ label = "a" ];
  II -> III [ label = "b" ];
  III -> I [ label = "a" ];
  IV -> V [ label = "a" ];
  V -> IV [ label = "b" ];
}
`,
]

const meta = {
  order: 3,
  layout: 'practice',
  urlTitle: '03-gyakorlat-determinisztikus-veges-automatak',
  publishedAt: DateTime.local(2021, 9, 27, 8, 20),
  draft: false,
}

const content = {
  title: '3. gyakorlat – Determinisztikus véges automaták',
  excerpt:
    'Automatákhoz írtunk fel nyelveket ránézésre, majd adott nyelvekhez készítettünk determinisztikus véges automatákat.',
  cells,
}

module.exports = {
  meta,
  content,
}
