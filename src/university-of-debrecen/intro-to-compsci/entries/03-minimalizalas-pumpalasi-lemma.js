const { DateTime } = require('luxon')
const kroki = require('../../../common/cells/kroki')
const md = require('../../../common/cells/markdown')
const { section, subsection, subsubsection } = require('../../../common/cells/heading')
const tex = require('../../../common/tex')

function dfaMinimizationTable(alphabet, groups) {
  function statesHeadOfGroup(group) {
    const isFirstState = i => i == 0

    const style = color => `style="color: ${color || 'black'}"`

    return group.states.map((state, index) => `
      <th ${style(state.color)} class="${isFirstState(index) ? "first-state-of-group" : ""}">${state.name}</th>
    `).join('')
  }

  const head = `
<thead>
  <tr class="groups-head-row">
    <th>${tex`\\Sigma`}</th>
    ${groups.map(g => `<th colspan="${g.states.length}">${g.name}</th>`).join('')}
  </tr>
  <tr class="states-head-row">
    <th>&nbsp;</th>
    ${groups
      .map(statesHeadOfGroup)
      .join('')
    }
  </tr>
</thead>
`

  function transitionRowSegment(symbol, group) {
    const isFirstState = i => i == 0

    const style = color => `style="color: ${color || 'black'}"`

    return group.states.map((state, index) => `
      <td ${style(state.color)} class="${isFirstState(index) ? "first-state-of-group" : ""}">${state.transitions[symbol] || ''}</td>
    `).join('')
  }

  const body = `
<tbody>
    ${alphabet.map(symbol => `
      <tr>
        <td>${tex`${symbol}`}</td>
        ${groups
          .map(g => transitionRowSegment(symbol, g))
          .join('')
        }
      </tr>
    `).join('')}
</tbody>
`

return `
<table class="dfa-minimization-table">
  ${head}
  ${body}
</table>
`
}

const cells = [
  md.cell`
A gyakorlaton először determinisztikus véges automatákat minimalizáltunk, majd pedig az úgynvezett pumpálási lemma felhasználásával bizonyítottuk nyelvekről, hogy nem regulárisak. Ebben a bejegyzésben az órai feladatok megoldásai mellett megtalálható a minimalizálás algoritmusa, továbbá a pumpálási lemmán alapuló feladatok megoldásának lépései.

A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [03-minimalizalas-pumpalasi-lemma-feladatsor.pdf](./files/03-minimalizalas-pumpalasi-lemma-feladatsor.pdf)
`,
  section.cell`DFA minimalizálás`,
  subsection.cell`A DFA minimalizálás algoritmusa`,
  md.cell`
A minimalizálás algoritmusa részletesen, bizonyítással együtt elérhető a következő forrásban:

  > [Bach Iván: Formális nyelvek (2. kiadás); 43-49. oldal](https://www.typotex.hu/download/formalisnyelvek.pdf)

A következőkben röviden ismertetném az algoritmust, ahogy a gyakorlaton is felírtuk.

  0. Legyen adott az $M = (Q, \\Sigma, q_{0}, A, \\delta)$ teljesen specifikált determinisztikus véges automata.
  1. Bontsuk az automata állapotait két csoportra: elutasító állapotok ($Q$ azon elemei, melyek nincsenek benne $A$-ban) és elfogadó állapotok ($A$ elemei).
  2. Addig végezzünk csoportbontást a lenti lépéseknek megfelelően, ameddig lehetséges:
     1. Minden állapotra írjuk fel, hogy mely $\\Sigma$-beli betűre mely csoportbeli állapotba lépünk át belőle. Azaz, nem a tényleges állapot az érdekes, hanem a csoport, melyben a célállapot található.
     2. Vizsgáljuk meg a csoportokat! Ha egy csoport minden állapota azonosan viselkedik, azaz azonos bemenetre azonos csoportba visz át, akkor azzal a csoporttal nem csinálunk semmit. Ellenkező esetben azonban felbontjuk a csoportot annyi csoportra, ahány különböző viselkedést találunk benne. A különböző viselkedés azt jelenti, hogy ugyanazon bementre más csoportba visznek át az egyes állapotok. Az egyes csoportokba azok az állapotok fognak kerülni, melyek azonosan viselkednek.
  3. Ha már nem tudunk további csoportbontást végezni (azaz minden csoport azonosan viselkedő állapotokat tartalmaz), akkor készen vagyunk. Az $M^{\\prime} = (Q^{\\prime}, \\Sigma^{\\prime}, q_{0}^{\\prime}, A^{\\prime}, \\delta^{\\prime})$ minimális automatát a következőképpen írhatjuk fel:
     * $Q^{\\prime}$: Minden csoport egy állapotnak felel meg.
     * $\\Sigma^{\\prime}$: A bemeneti ábécé nem változik, megegyezik $\\Sigma$-val.
     * $q_{0}^{\\prime}$: A kezdőállapot az a csoport lesz, melyben az eredeti kezdőállapot található.
     * $A^{\\prime}$: Minden olyan csoport elfogadó állapot lesz, mely az eredeti automata elfogadó állapotait tartalmazza.
     * $\\delta^{\\prime}$: Az állapotátmenet függvényt az egyes csoportokban található állapotok viselkedése alapján írhatjuk fel.

A fenti algoritmust egy táblázat segítségével szoktuk végrehajtani. A \`2.55. a)\` részfeladatban megjelenik e táblázat kitöltésének pontos módja. 
`,
  subsection.cell`2.55. feladat`,
  subsubsection.cell`2.55. a.`,
  md.cell`
A minimalizálási algoritmus első lépésének megfelelően, azzal kezdjük a megoldást, hogy az automata állapotait két csoportra bontjuk. Az I. csoportba kerülnek az elutasító állapotok, míg a II. csoportba az elfogadó állapotok.

A csoportosítást, majd csoportbontást egy táblázat segítségével végezzük, melyből minden egyes csoportbontástkor újat készítünk. A táblázat oszlopait az eredeti automata állapotai, sorait pedig a bemeneti ábécé betűi alkotják. Az egyes cellákba az adott állapotátmenetnek megfelelő csoportot írjuk.

A cellák kitöltését megelőzően a táblázat a következő:
`,
  dfaMinimizationTable(['a', 'b'], [
    {
      name: 'I.',
      states: [
        { name: '1', transitions: {} },
        { name: '2', transitions: {} },
        { name: '3', transitions: {} },
        { name: '4', transitions: {} },
      ]
    },
    {
      name: 'II.',
      states: [
        { name: '5', transitions: {} },
      ]
    }
  ]),
  md.cell`
Most már csak annyi a dolgunk, hogy végighaladunk az eredeti automata összes állapotán, és megnézzük, hogy az egyes állapotok hogyan viselkednek. Például az $1$ állapot az $a$ bemenetre a $2$ állapotba visz, mely az I. csoportban található. Ebbe a cellába tehát az I. csoportot írjuk.

Az összes állapotra elvégezve a fentieket, a következő táblázatot kapjuk:
`,
  dfaMinimizationTable(['a', 'b'], [
    {
      name: 'I.',
      states: [
        { name: '1', transitions: {
          a: 'I.',
          b: 'I.'
        } },
        { name: '2', transitions: {
          a: 'I.',
          b: 'II.'
        } },
        { name: '3', transitions: {
          a: 'I.',
          b: 'I.'
        } },
        { name: '4', transitions: {
          a: 'I.',
          b: 'II.'
        } },
      ]
    },
    {
      name: 'II.',
      states: [
        { name: '5', transitions: {
          a: 'I.',
          b: 'II.'
        } },
      ]
    }
  ]),
  md.cell`
Miután kitöltöttük a táblázatot, megvizsgáljuk, hogy van-e lehetőség csoportbontásra. Egy csoportot akkor kell felbontanunk, ha vannak benne eltérő módon viselkedő állapotok. A II. csoport, mely egy állapotból áll, nyilván nem szorul felbontásra. Ugyanakkor az I. csoportot két új csoportra kell bontanunk:
  * Azon állapotok, melyek $a$ betűre és $b$ betűre is az I. csoportba visznek (piros állapotok).
  * Azon állapotok, melyek $a$ betűre az I., $b$ betűre a II. csoportba visznek (zöld állapotok).
`,
  dfaMinimizationTable(['a', 'b'], [
    {
      name: 'I.',
      states: [
        { name: '1', color: 'red', transitions: {
          a: 'I.',
          b: 'I.'
        } },
        { name: '2', color: 'green', transitions: {
          a: 'I.',
          b: 'II.'
        } },
        { name: '3', color: 'red', transitions: {
          a: 'I.',
          b: 'I.'
        } },
        { name: '4', color: 'green', transitions: {
          a: 'I.',
          b: 'II.'
        } },
      ]
    },
    {
      name: 'II.',
      states: [
        { name: '5', transitions: {
          a: 'I.',
          b: 'II.'
        } },
      ]
    }
  ]),
  md.cell`
Miután így kijelöltük a felbontást, írjuk is fel az új táblázatot!
`,
  dfaMinimizationTable(['a', 'b'], [
    {
      name: 'I.',
      states: [
        { name: '1', transitions: {} },
        { name: '3', transitions: {} },
      ]
    },
    {
      name: 'II.',
      states: [
        { name: '2', transitions: {} },
        { name: '4', transitions: {} },
      ]
    },
    {
      name: 'III.',
      states: [
        { name: '5', transitions: {} },
      ]
    }
  ]),
  md.cell`
Most már három csoportunk van, hiszen a korábbi I. csoportból létrehoztuk az új I. és II. csoportokat. Az $5$ állapot továbbra is önmagában áll a III. csoportban.

A továbbiakban ugyanazt kell tennünk, mint megelőzőleg: beírni az egyes cellákba az állapotátmeneteknek megfelelő csoportokat.
`,
  dfaMinimizationTable(['a', 'b'], [
    {
      name: 'I.',
      states: [
        { name: '1', transitions: {
          a: 'II.',
          b: 'I.'
        } },
        { name: '3', transitions: {
          a: 'II.',
          b: 'I.'
        } },
      ]
    },
    {
      name: 'II.',
      states: [
        { name: '2', transitions: {
          a: 'I.',
          b: 'III.'
        } },
        { name: '4', transitions: {
          a: 'I.',
          b: 'III.'
        } },
      ]
    },
    {
      name: 'III.',
      states: [
        { name: '5', transitions: {
          a: 'II.',
          b: 'III.'
        } },
      ]
    }
  ]),
  md.cell`
Ezzel az algoritmus második lépését befejeztük: nem további csoportbontást végezni. Folytathatjuk a harmadik lépéssel, az új, minimális automata felírásával:
  * Az állapotok $Q^{\\prime}$ halmaza az I., II., III. állapotokból fog állni, hiszen minden csoport egy állapotot alkot.
  * A bemeneti ábécé nem változik, $\\Sigma^{\\prime} = \\Sigma$.
  * A $q_{0}^{\\prime}$ kezdőállapot az I. állapot lesz, hiszen ez a csoport tartalmazza az eredeti kezdő állapotot.
  * Az elfogadó állapotok $A^{\\prime}$ halmaza egy elemből áll: csupán a III. csoportból képzett állapot lesz elfogadó állapot, hiszen csak ez tartalmaz eredeti elfogadó állapotokat.
  * A $\\delta^{\\prime}$ állapotátmeneti függvényt a táblázatnak megfelelően írhatjuk fel.
`,
  kroki.cell('graphviz', 'svg')`
  digraph dfa_255a {
	rankdir=LR;
    size="8,5"
    node [shape = point; color = white ]; S;
    node [shape = doublecircle; color = black]; III;
    node [shape = circle];

    S -> I;
    I -> II [ label = "a" ];
    I -> I [ label = "b" ];
    II -> I [ label = "a" ];
    II -> III [ label = "b" ];
    III -> II [ label = "a" ];
    III -> III [ label = "b" ];
}
`,
  md.cell`
Ezzel készen vagyunk, felírtuk a minimális automatát.

Amire figyeljünk oda az algoritmus végrehajtásakor:
  * Ha két állapot egyszer külön csoportba került, akkor **sosem** kerülhetnek újra egy csoportba.
  * A csoportok elnevezése tetszőleges, valamint a "sorrendjük" is, azaz nyugodtan lehetett volna a megoldás elején az I. csoport az elfogadó állapotok csoportja, míg a II. csoport az elutasító állapotok csoportja. Ez nem befolyásolja az algoritmust működését.
  * Végezzünk önellenőrzést: vizsgáljuk meg néhány példára, hogy a minimalizált automata ténylegesen ugyanazokat a szavakat utasítja és fogadja el, mint az eredeti automata.
`
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
  cells
}

module.exports = {
  meta,
  content,
}