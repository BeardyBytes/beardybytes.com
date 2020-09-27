const { DateTime } = require('luxon')
const kroki = require('../../../common/cells/kroki')
const md = require('../../../common/cells/markdown')
const { section, subsection, subsubsection } = require('../../../common/cells/heading')
const tex = require('../../../common/tex')

function dfaMinimizationTable(alphabet, groups) {
  function statesHeadOfGroup(group) {
    const isFirstState = i => i == 0

    return group.states.map((state, index) => `
      <th class="${isFirstState(index) ? "first-state-of-group" : ""}">${state.name}</th>
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

    return group.states.map((state, index) => `
      <td class="${isFirstState(index) ? "first-state-of-group" : ""}">${state.transitions[symbol] || ''}</td>
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
  cells
}

module.exports = {
  meta,
  content,
}
