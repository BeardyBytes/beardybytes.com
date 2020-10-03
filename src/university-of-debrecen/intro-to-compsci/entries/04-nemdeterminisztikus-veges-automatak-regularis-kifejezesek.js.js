const { DateTime } = require('luxon')
const kroki = require('../../../common/cells/kroki')
const md = require('../../../common/cells/markdown')
const { section, subsection, subsubsection } = require('../../../common/cells/heading')
const tex = require('../../../common/tex')

function nullRemovalTable(alphabet, states) {
  const head = `
<thead>
  <tr>
    <th>${tex`\\Sigma`}</th>
    ${alphabet.map((a) => `<th>${tex`${a}`}</th>`).join('')}
  </tr>
</thead>
`
  const body = `
<tbody>
  ${states
    .map((s) => {
      return `
    <tr>
      <td>${tex`${s.name}`}</td>
      ${alphabet
        .map((a) => {
          const result = s.transitions[a] ? tex`${s.transitions[a].join(', ')}` : 'Trap'

          return `<td>${result}</td>`
        })
        .join('')}
    </tr>
    `
    })
    .join('')}
</tbody>
`

  return `
<table class="null-removal-table">
  ${head}
  ${body}
</table>
`
}

function determinizationTable(alphabet, states) {
  const head = `
<thead>
  <tr>
    <th>${tex`\\Sigma`}</th>
    ${alphabet.map((a) => `<th>${tex`${a}`}</th>`).join('')}
  </tr>
</thead>
`
  const body = `
<tbody>
  ${states
    .map((s) => {
      return `
    <tr>
      <td>${tex`${s.name}`}</td>
      ${alphabet
        .map((a) => {
          const result = s.transitions[a] || 'Trap'

          return `<td>${result}</td>`
        })
        .join('')}
    </tr>
    `
    })
    .join('')}
</tbody>
`

  return `
<table class="determinization-table">
  ${head}
  ${body}
</table>
`
}

const cells = [
  md.cell`
A gyakorlaton előbb egy kétfázisú algoritmus segítségével készítettünk nemdeterminisztikus véges automatákból determinisztikus véges automatákat, majd reguláris kifejezésekkel dolgoztunk. E bejegyzésben a megfelelő feladatokat megoldásai mellett megtalálható a determinisztikussá alakítás algoritmusa.

A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [04-nemdeterminisztikus-veges-automatak-regularis-kifejezesek-feladatsor.pdf](./files/04-nemdeterminisztikus-veges-automatak-regularis-kifejezesek-feladatsor.pdf)
`,
  section.cell`Bemelegítés`,
  subsection.cell`1. feladat`,
  md.cell`
> a) $\\{1, 3\\}$

> b) $\\{1, 3, 4, 5\\}$
`,
  subsection.cell`2. feladat`,
  md.cell`
> a) Igen.

> b) Nem.

> c) Igen.
`,
  section.cell`Nemdeterminisztikus véges automaták determinisztikussá alakítása`,
  subsection.cell`Az üres szó átmenetek eltávolítása`,
  md.cell`
A determinisztikus automata előállításának első fázisa az üres szó ($\\lambda$) átmenetek eltávolítása. Ez a következőképpen történik:

  0. Legyen adott az $M = (Q, \\Sigma, q_{0}, A, \\delta)$ nemdeterminisztikus véges automata.
  1. Egy táblázat formájában írjuk fel minden $q \\in Q$ állapotra és minden $a \\in \\Sigma$ bemeneti betűre a $\\delta^{*}(q, a)$ halmazt, figyelembe véve az üres szó átmeneteket.
  2. E táblázat alapján az $M^{\\prime} = (Q^{\\prime}, \\Sigma^{\\prime}, q_{0}^{\\prime}, A^{\\prime}, \\delta^{\\prime})$ üres szó átmenetek nélküli (de feltehetően továbbra is nemdeterminisztikus) automatát a következőképpen írhatjuk fel:
     * $Q^{\\prime}$: Megegyezik $M$ állapothalmazával, azaz $Q$-val.
     * $\\Sigma^{\\prime}$: A bemeneti ábécé sem változik, megegyezik $\\Sigma$-val.
     * $q_{0}^{\\prime}$: A kezdőállapot is azonos, marad $q_{0}$
     * $A^{\\prime}$: Elfogadó állapot lesz az összes eredeti elfogadó állapot ($A$), továbbá minden olyan állapot, melyből üres szó átmenet vezetett valamilyen eredeti elfogadó állapotba.
     * $\\delta^{\\prime}$: Az új állapotátmenet függvényt az előző pontban képzett táblázat alapján írjuk fel.

Az algoritmus végrehajtásának és a táblázat kitöltésének pontos módja megjelenik a \`3. b)\` részfeladatban.
`,
  subsection.cell`3. feladat`,
  subsubsection.cell`3. b) feladat`,
  md.cell`
Az üres szó átmenetek eltávolítását egy táblázat segítségével végezzük, mely minden bemeneti betűhöz egy oszlopot, és minden állapothoz egy sort rendel.

Kezdjük a táblázat kitöltését az $1$ állapottal! Itt nem kell figyelembe vennünk semmilyen üres szó átmenetet, ezért még elég könnyű dolgunk van.
`,
  nullRemovalTable(
    ['a', 'b'],
    [
      {
        name: '1',
        transitions: {
          a: ['2'],
        },
      },
    ]
  ),
  md.cell`
Folytassuk most a $2$ állapottal! Bár ezen állapotból sem indul ki közvetlenül üres szó átmenet, azonban mind $a$ betűvel, mind $b$ betűvel olyan állapotba jutunk, melyek már rendelkeznek üres szó átmenettel is. Mivel üres szót bármikor szabadon olvashatunk, ez azt jelenti, hogy például egy $a$ betűt olvasva, nem csak az $5$ állapotba, hanem az $1$ állapotba is eljuthatunk! Ugyanígy, ha $b$ betűt olvasunk, nem csak a $3$ állapot, hanem az $1$ állapot is elérhető.

Bővítsük is a fenti táblázatot ezekkel az átmenetekkel!
`,
  nullRemovalTable(
    ['a', 'b'],
    [
      {
        name: '1',
        transitions: {
          a: ['2'],
        },
      },
      {
        name: '2',
        transitions: {
          a: ['1', '5'],
          b: ['1', '3'],
        },
      },
    ]
  ),
  md.cell`
A következő állapot, melyek megvizsgálunk, a $3$. Megnézvén az automata állapot-diagramját, láthatjuk, hogy a $3$ állapotból üres szóval átléphetünk az $1$ állapotba. Ez lényegében azt jelenti, hogy bármely állapotba, melybe át lehet lépni az $1$ állapotból, át lehet lépni a $3$ állapotból is! Egészen pontosan ez azt jelenti, hogy a $3$ állapotban $a$ betűt olvasva nem csak a $4$ állapotba léphetünk át, hanem a $2$ állapotba is.  
`,
  nullRemovalTable(
    ['a', 'b'],
    [
      {
        name: '1',
        transitions: {
          a: ['2'],
        },
      },
      {
        name: '2',
        transitions: {
          a: ['1', '5'],
          b: ['1', '3'],
        },
      },
      {
        name: '3',
        transitions: {
          a: ['2', '4'],
        },
      },
    ]
  ),
  md.cell`
A $4$ állapot ugyan nem rendelkezik közvetlen üres szó átmenettel, azonban $b$ betűt olvasva átlépünk a $3$ állapotba, mely már igen. Ez az üres szó átmenet, mint fönt is láttuk az $1$ állapotba vezet, ami azt jelenti, hogy a $4$ állapotban $b$ betűt olvasva eljuthatunk az $1$ állapotba is.
`,
  nullRemovalTable(
    ['a', 'b'],
    [
      {
        name: '1',
        transitions: {
          a: ['2'],
        },
      },
      {
        name: '2',
        transitions: {
          a: ['1', '5'],
          b: ['1', '3'],
        },
      },
      {
        name: '3',
        transitions: {
          a: ['2', '4'],
        },
      },
      {
        name: '4',
        transitions: {
          b: ['1', '3'],
        },
      },
    ]
  ),
  md.cell`
Maradt az $5$ állapot, mely nagyon hasonló a $3$ állapothoz. Mivel üres szó átmenet vezet az $1$ állapotba, ezért átvesszük annak az átmeneteit.
`,
  nullRemovalTable(
    ['a', 'b'],
    [
      {
        name: '1',
        transitions: {
          a: ['2'],
        },
      },
      {
        name: '2',
        transitions: {
          a: ['1', '5'],
          b: ['1', '3'],
        },
      },
      {
        name: '3',
        transitions: {
          a: ['2', '4'],
        },
      },
      {
        name: '4',
        transitions: {
          b: ['1', '3'],
        },
      },
      {
        name: '5',
        transitions: {
          a: ['2'],
        },
      },
    ]
  ),
  md.cell`
Mielőtt felrajzolnánk az automatát, meg kell állapítanunk, hogy melyek lesznek az elfogadó állapotok. Az $1$ állapot biztosan az lesz, hiszen meg kell tartanunk az eredeti elfogadó állapotokat. Ezen felül a $3$ és az $5$ állapotok lesznek elfogadó állapotok, ugyanis ezekből lehetett $\\lambda$ átmenettel elfogadó állapotba lépni.
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; 1, 3, 5;
  node [shape = circle];

  S -> 1;
  1 -> 2 [ label = "a" ];
  2 -> 1 [ label = "a" ];
  2 -> 5 [ label = "a" ];
  2 -> 1 [ label = "b" ];
  2 -> 3 [ label = "b" ];
  3 -> 2 [ label = "a" ];
  3 -> 4 [ label = "a" ];
  4 -> 1 [ label = "b" ];
  4 -> 3 [ label = "b" ];
  5 -> 2 [ label = "a" ];
}
`,
  subsubsection.cell`3. c)`,
  md.cell`
Újdonság ebben a feladatban a $4$ állapot önmagába mutató $a$ átmenete. Ezt ugyanúgy kell kezelnünk, mintha egy üres szó átmenetet megelőzően olvasnánk $a$ betűt.
`,
  nullRemovalTable(
    ['a', 'b'],
    [
      {
        name: '1',
        transitions: {
          a: ['2', '3'],
        },
      },
      {
        name: '2',
        transitions: {
          a: ['1'],
        },
      },
      {
        name: '3',
        transitions: {
          b: ['2, 4'],
        },
      },
      {
        name: '4',
        transitions: {
          a: ['1', '2', '4'],
        },
      },
    ]
  ),
  kroki.cell('graphviz', 'svg')`
digraph dfa_3d {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; 2, 4;
  node [shape = circle];

  S -> 1;

  1 -> 2 [ label = "a" ];
  1 -> 3 [ label = "a" ];

  2 -> 1 [ label = "a" ];

  3 -> 2 [ label = "b" ];
  3 -> 4 [ label = "b" ];

  4 -> 1 [ label = "a" ];
  4 -> 2 [ label = "a" ];
  4 -> 4 [ label = "a" ];
}`,
  subsubsection.cell`3. d)`,
  md.cell`
Ebben a feladatban arra kell nagyon figyelnünk, hogy az automata tartalmaz "két egymást követő" üres szó átmenetet. Természetesen ilyenkor üres szót olvasva mindkét átmeneten végigmehet az automata, aminek meg kell jelennie a táblázatunkban is.
`,
  nullRemovalTable(
    ['a', 'b'],
    [
      {
        name: '1',
        transitions: {
          a: ['3', '4', '5', '6'],
          b: ['5'],
        },
      },
      {
        name: '2',
        transitions: {
          a: ['3'],
        },
      },
      {
        name: '3',
        transitions: {
          b: ['2'],
        },
      },
      {
        name: '4',
        transitions: {
          a: ['4', '5', '6'],
          b: ['5'],
        },
      },
      {
        name: '5',
        transitions: {
          a: ['6'],
          b: ['5'],
        },
      },
      {
        name: '6',
        transitions: {},
      },
    ]
  ),
  kroki.cell('graphviz', 'svg')`
digraph dfa_3d {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; 1, 2, 6;
  node [shape = circle];

  S -> 1;

  1 -> 3 [ label = "a" ];
  1 -> 4 [ label = "a" ];
  1 -> 5 [ label = "a, b" ];
  1 -> 6 [ label = "a" ];

  2 -> 3 [ label = "a" ];

  3 -> 2 [ label = "b" ];

  4 -> 4 [ label = "a" ];
  4 -> 5 [ label = "a, b" ];
  4 -> 6 [ label = "a" ];

  5 -> 6 [ label = "a" ];
  5 -> 5 [ label = "b" ];
}`,
  subsection.cell`A nemdeterminisztikus viselkedés kiküszöbölése`,
  md.cell`
Az ekvivalens determinisztikus véges automata felírásának második fázisa a nemdeterminisztikus viselkedés kiküszöbölése. Ennek lépései a következők:  

  0. Legyen adott az $M = (Q, \\Sigma, q_{0}, A, \\delta)$ nemdeterminisztikus véges automata, mely **nem** tartalmaz üres szó átmeneteket.
  1. Kiindulva a $\\{q_{0}\}}$ állapothalmazból, térképezzük fel, hogy a bemeneti ábécé egyes betűivel mely állapothalmazok érhetők el.
  2. Ezt követően az $M^{\\prime} = (Q^{\\prime}, \\Sigma^{\\prime}, q_{0}^{\\prime}, A^{\\prime}, \\delta^{\\prime})$ determinisztikus véges automatát a következőképpen írhatjuk fel:
     * $Q^{\\prime}$: Az 1. lépés minden állapothalmaza egy új állapot lesz.
     * $\\Sigma^{\\prime}$: A bemeneti ábécé nem változik, megegyezik $\\Sigma$-val.
     * $q_{0}^{\\prime}$: A kezdőállapot a $\\{q_{0}\\}$ állapothalmaznak megfelelő állapot lesz.
     * $A^{\\prime}$: Elfogadó állapot lesz minden olyan állapothalmazból képzett állapot, mely halmaz tartalmazott legalább egy eredeti elfogadó állapotot.
     * $\\delta^{\\prime}$: Az új állapotátmenet függvényt az 1. lépés alapján írjuk fel.
    
Ahogy sok más algoritmust, ezt is egy táblázat segítségével szoktuk végrehajtani. E táblázat kitöltésének pontos módját adja meg a \`4. a)\` részfeladat.
`,
  subsection.cell`4. feladat`,
  subsubsection.cell`4. a)`,
  md.cell`
Az algoritmus szerint, a kiinduló állapothalmazunk csak a kezdőállapotot tartalmazza, azaz az $\\{1\\}$ halmaz lesz. E halmaz minden elemére (azaz, jelenleg csak az $1$ állapotra) meg kell vizsgálnunk az automata viselkedését: Ha $a$ betűt olvasunk, akkor az $1$ és a $2$ állapotokba, tehát együttesen az $\\{1, 2\\}$ állapothalmazba tudunk továbblépni. $b$ betűt olvasva maradunk, azaz az $\\{1\\}$ halmazba lépünk. Táblázat formájában ezek az okoskodások a következőképpen írhatók fel:
`,
  determinizationTable(
    ['a', 'b'],
    [
      {
        name: '1',
        transitions: {
          a: '12',
          b: '1',
        },
      },
    ]
  ),
  md.cell`
Mivel ezeket a halmazokat elég fárasztó lenne kiírni, ezért legtöbbször rövidíteni szoktunk, és a halmazt alkotó elemeket egyszerűen egymás után írjuk. Ez persze azt is jelenti, hogy az $12$ és a $21$ rövidítések azonos halmazokat jelölnek!

A következő lépésben minden olyan halmaz viselkedését megvizsgáljuk, mellyel még nem foglalkoztunk korábban. Mivel a $b$ betűvel elérhető $1$ halmazt most írtuk fel, ezért csak az $12$ halmazzal kell dolgoznunk.

Az $12$ halmazt két állapot alkotja, az $1$ és a $2$. Ez azt jelenti, hogy $a$ betűt olvasva az $1$ és $2$ állapotokba léphetünk, $b$ betűt olvasva pedig az $1$ és $3$ állapotokba.
`,
  determinizationTable(
    ['a', 'b'],
    [
      {
        name: '1',
        transitions: {
          a: '12',
          b: '1',
        },
      },
      {
        name: '12',
        transitions: {
          a: '12',
          b: '13',
        },
      },
    ]
  ),
  md.cell`
Most már csak ismételgetnünk kell, amit eddig. Az $12$ halmazt már vizsgáltuk, így marad az $13$ halmaz. Ebben $a$ betűt olvasva az $12$, $b$ betűt olvasva pedig az $1$ halmazba juthatunk.
`,
  determinizationTable(
    ['a', 'b'],
    [
      {
        name: '1',
        transitions: {
          a: '12',
          b: '1',
        },
      },
      {
        name: '12',
        transitions: {
          a: '12',
          b: '13',
        },
      },
      {
        name: '13',
        transitions: {
          a: '12',
          b: '1',
        },
      },
    ]
  ),
  md.cell`
Mivel minden elérhető halmaz szerepel a táblázatban, készen vagyunk. Utolsó lépésként meg kell állapítanunk, hogy mely új állapotok lesznek elfogadó állapotok. Mivel az egyetlen állapothalmaz, mely elfogadó állapotot tartalmaz, az $13$, ezért csak a belőle képzett állapot lesz elfogadó állapot.
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3d {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; 13;
  node [shape = circle];

  S -> 1;

  1 -> 12 [ label = "a" ];
  1 -> 1 [ label = "b" ];

  12 -> 12 [ label = "a" ];
  12 -> 13 [ label = "b" ];

  13 -> 12 [ label = "a" ];
  13 -> 1 [ label = "b" ];
}`,
]

const meta = {
  order: 4,
  layout: 'practice',
  urlTitle: '04-nemdeterminisztikus-veges-automatak-regularis-kifejezesek',
  publishedAt: DateTime.local(2020, 9, 30, 9, 43),
  draft: false,
}

const content = {
  title: '4. gyakorlat – Nemdeterminisztikus véges automaták, reguláris kifejezések',
  excerpt:
    'Nemdeterminisztikus véges automatákból készítettünk velük ekvivalens determinisztikus véges automatát, valamint reguláris kifejezéseket írtunk fel.',
  cells,
}

module.exports = {
  meta,
  content,
}
