const { DateTime } = require('luxon')
const kroki = require('../../../common/cells/kroki')
const md = require('../../../common/cells/markdown')
const { section, subsection, subsubsection } = require('../../../common/cells/heading')
const tex = require('../../../common/tex')

function dfaMinimizationTable(alphabet, groups) {
  function statesHeadOfGroup(group) {
    const isFirstState = (i) => i == 0

    const style = (color) => `style="color: ${color || 'black'}"`

    return group.states
      .map(
        (state, index) => `
      <th ${style(state.color)} class="${isFirstState(index) ? 'first-state-of-group' : ''}">${state.name}</th>
    `
      )
      .join('')
  }

  const head = `
<thead>
  <tr class="groups-head-row">
    <th>${tex`\\Sigma`}</th>
    ${groups.map((g) => `<th colspan="${g.states.length}">${g.name}</th>`).join('')}
  </tr>
  <tr class="states-head-row">
    <th>&nbsp;</th>
    ${groups.map(statesHeadOfGroup).join('')}
  </tr>
</thead>
`

  function transitionRowSegment(symbol, group) {
    const isFirstState = (i) => i == 0

    const style = (color) => `style="color: ${color || 'black'}"`

    return group.states
      .map(
        (state, index) => `
      <td ${style(state.color)} class="${isFirstState(index) ? 'first-state-of-group' : ''}">${
          state.transitions[symbol] || ''
        }</td>
    `
      )
      .join('')
  }

  const body = `
<tbody>
    ${alphabet
      .map(
        (symbol) => `
      <tr>
        <td>${tex`${symbol}`}</td>
        ${groups.map((g) => transitionRowSegment(symbol, g)).join('')}
      </tr>
    `
      )
      .join('')}
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
  dfaMinimizationTable(
    ['a', 'b'],
    [
      {
        name: 'I.',
        states: [
          { name: '1', transitions: {} },
          { name: '2', transitions: {} },
          { name: '3', transitions: {} },
          { name: '4', transitions: {} },
        ],
      },
      {
        name: 'II.',
        states: [{ name: '5', transitions: {} }],
      },
    ]
  ),
  md.cell`
Most már csak annyi a dolgunk, hogy végighaladunk az eredeti automata összes állapotán, és megnézzük, hogy az egyes állapotok hogyan viselkednek. Például az $1$ állapot az $a$ bemenetre a $2$ állapotba visz, mely az I. csoportban található. Ebbe a cellába tehát az I. csoportot írjuk.

Az összes állapotra elvégezve a fentieket, a következő táblázatot kapjuk:
`,
  dfaMinimizationTable(
    ['a', 'b'],
    [
      {
        name: 'I.',
        states: [
          {
            name: '1',
            transitions: {
              a: 'I.',
              b: 'I.',
            },
          },
          {
            name: '2',
            transitions: {
              a: 'I.',
              b: 'II.',
            },
          },
          {
            name: '3',
            transitions: {
              a: 'I.',
              b: 'I.',
            },
          },
          {
            name: '4',
            transitions: {
              a: 'I.',
              b: 'II.',
            },
          },
        ],
      },
      {
        name: 'II.',
        states: [
          {
            name: '5',
            transitions: {
              a: 'I.',
              b: 'II.',
            },
          },
        ],
      },
    ]
  ),
  md.cell`
Miután kitöltöttük a táblázatot, megvizsgáljuk, hogy van-e lehetőség csoportbontásra. Egy csoportot akkor kell felbontanunk, ha vannak benne eltérő módon viselkedő állapotok. A II. csoport, mely egy állapotból áll, nyilván nem szorul felbontásra. Ugyanakkor az I. csoportot két új csoportra kell bontanunk:
  * Azon állapotok, melyek $a$ betűre és $b$ betűre is az I. csoportba visznek (piros állapotok).
  * Azon állapotok, melyek $a$ betűre az I., $b$ betűre a II. csoportba visznek (zöld állapotok).
`,
  dfaMinimizationTable(
    ['a', 'b'],
    [
      {
        name: 'I.',
        states: [
          {
            name: '1',
            color: 'red',
            transitions: {
              a: 'I.',
              b: 'I.',
            },
          },
          {
            name: '2',
            color: 'green',
            transitions: {
              a: 'I.',
              b: 'II.',
            },
          },
          {
            name: '3',
            color: 'red',
            transitions: {
              a: 'I.',
              b: 'I.',
            },
          },
          {
            name: '4',
            color: 'green',
            transitions: {
              a: 'I.',
              b: 'II.',
            },
          },
        ],
      },
      {
        name: 'II.',
        states: [
          {
            name: '5',
            transitions: {
              a: 'I.',
              b: 'II.',
            },
          },
        ],
      },
    ]
  ),
  md.cell`
Miután így kijelöltük a felbontást, írjuk is fel az új táblázatot!
`,
  dfaMinimizationTable(
    ['a', 'b'],
    [
      {
        name: 'I.',
        states: [
          { name: '1', transitions: {} },
          { name: '3', transitions: {} },
        ],
      },
      {
        name: 'II.',
        states: [
          { name: '2', transitions: {} },
          { name: '4', transitions: {} },
        ],
      },
      {
        name: 'III.',
        states: [{ name: '5', transitions: {} }],
      },
    ]
  ),
  md.cell`
Most már három csoportunk van, hiszen a korábbi I. csoportból létrehoztuk az új I. és II. csoportokat. Az $5$ állapot továbbra is önmagában áll a III. csoportban.

A továbbiakban ugyanazt kell tennünk, mint megelőzőleg: beírni az egyes cellákba az állapotátmeneteknek megfelelő csoportokat.
`,
  dfaMinimizationTable(
    ['a', 'b'],
    [
      {
        name: 'I.',
        states: [
          {
            name: '1',
            transitions: {
              a: 'II.',
              b: 'I.',
            },
          },
          {
            name: '3',
            transitions: {
              a: 'II.',
              b: 'I.',
            },
          },
        ],
      },
      {
        name: 'II.',
        states: [
          {
            name: '2',
            transitions: {
              a: 'I.',
              b: 'III.',
            },
          },
          {
            name: '4',
            transitions: {
              a: 'I.',
              b: 'III.',
            },
          },
        ],
      },
      {
        name: 'III.',
        states: [
          {
            name: '5',
            transitions: {
              a: 'II.',
              b: 'III.',
            },
          },
        ],
      },
    ]
  ),
  md.cell`
Ezzel az algoritmus második lépését befejeztük: nem tudunk további csoportbontást végezni. Folytathatjuk a harmadik lépéssel, az új, minimális automata felírásával:
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
`,
  subsubsection.cell`2.55. b.`,
  md.cell`
  A megadott automata minimális.
`,
  subsubsection.cell`2.55. d.`,
  kroki.cell('graphviz', 'svg')`
  digraph dfa_255a {
	rankdir=LR;
    size="8,5"
    node [shape = point; color = white ]; S;
    node [shape = doublecircle; color = black]; IV V;
    node [shape = circle];

    S -> I;

    I -> II [ label = "a" ];
    I -> III [ label = "b" ];

    II -> IV [ label = "a" ];
    II -> III [ label = "b" ];

    III -> IV [ label = "a" ];
    III -> V [ label = "b" ];

    IV -> IV [ label = "a" ];
    IV -> III [ label = "b" ];

    V -> IV [ label = "a" ];
    V -> V [ label = "b" ];
  }
`,
  section.cell`A pumpálási lemma alkalmazása`,
  subsection.cell`A pumpálási lemma`,
  md.cell`
A pumpálási (iterációs) lemma bizonyítással együtt megtalálható a következő forrásokban:

  > [Dömösi, Falucskai, Horváth, Mecsei, Nagy: Formális Nyelvek és Automaták; 5.10](https://gyires.inf.unideb.hu/KMITT/b24/ch05s10.html),

  > Hopcroft, Motwani, Ullman: Introduction to Automata Theory, Languages, and Computation (3rd edition); 128-133.

Legyen $\\Sigma$ egy ábécé. Ha az $L \\subseteq \\Sigma^{*}$ nyelvet elfogadja az $M = (Q, \\Sigma, q_{0}, A, \\delta)$ véges automata és $n = |Q|$, akkor minden olyan $x \\in L$ $L$-beli szó, amelyre teljesül, hogy $|x| \\geq n$, felírható

$$
x = uvw
$$

alakban, ahol
  * $|uv| \\leq n$,
  * $|v| > 0$ (azaz $v \\neq \\lambda$),
  * $uv^{i}w \\in L$ bármely $i \\geq 0$-ra.
`,
  subsection.cell`2.22. feladat`,
  subsubsection.cell`2.22. a.`,
  md.cell`
Tegyük fel, hogy az $L = \\{ a^{i}ba^{2i} \\;|\\; i \\geq 0 \\}$ nyelv reguláris. Ekkor, a pumpálási lemma szerint, adott valamilyen, $L$-től függő $n$, az elég hosszú szó hossza.

Válasszuk meg az $x \\in L$ szót a következőképpen:

$$
x = a^{n}ba^{2n}.
$$

A fenti választásunk olyan, hogy $|x| \\geq n$.

A pumpálási lemma szerint ekkor $x$ felírható $x = uvw$ alakban, mely felbontásnak teljesítenie kell a következőket.

$|uv| \\leq n$, amiből következik, hogy az $uv$ részszó csupa $a$ betűből áll (hiszen $x$ $n$ darab $a$ betűvel kezdődik).

$|v| > 0$, amiből, ha összekapcsoljuk az előző ponttal, adódik, hogy $v$ csupa $a$ betűből áll (hiszen már $uv$ is csupa $a$ betűbőll állt).

Végül, a $v$ részszó pumpálásával képzett szavaknak is benne kell lenniük $L$-ben, azaz, például $uvvw \\in L$. Ugyanakkor, mivel $v \\neq \\lambda$ és $v$ csupa $a$ betűből áll, ezért nyilván $vv$ is csupa $a$ betűből fog állni. Ez viszont azt jelenti, hogy ha az $uvw$ szó pontosan feleannyi $a$ betűvel kezdődött, mint ahány $a$ betűvel végződött, akkor az $uvvw$ szó elején már biztosan nem feleannyi (hanem több) $a$ betű fog állni, mint a végén. Tehát annak ellenére, hogy $uvw \\in L$, a pumpálással képzett $uvvw$ szóra $uvvw \\notin L$.

Mivel a bizonyítás elején feltettük, hogy $L$ reguláris, azonban találtunk olyan szót $L$-ben, melyre nem teljesül a pumpálási lemma, ezért ellentmondást kaptunk, azaz $L$ nem reguláris.
`,
  subsubsection.cell`2.22. d.`,
  md.cell`
Tegyük fel, hogy az

$$
L = \\{ a^{i}b^{j} \\;|\\; \\text{$j$ többszöröse $i$-nek}\\}
$$

nyelv reguláris. Ekkor, a pumpálási lemma szerint, adott valamilyen, $L$-től függő $n$, az elég hosszú szó hossza.

Válasszuk meg az $x \\in L$ szót a következőképpen:

$$
x = a^{n}b^{2n}.
$$

A fenti választásunk olyan, hogy $|x| \\geq n$.

A pumpálási lemma szerint ekkor $x$ felírható $x = uvw$ alakban, mely felbontásnak teljesítenie kell a következőket.

$|uv| \\leq n$, amiből következik, hogy az $uv$ részszó csupa $a$ betűből áll (hiszen $x$ $n$ darab $a$ betűvel kezdődik).

$|v| > 0$, amiből, ha összekapcsoljuk az előző ponttal, adódik, hogy $v$ csupa $a$ betűből áll (hiszen már $uv$ is csupa $a$ betűbőll állt).

Végül, a $v$ részszó pumpálásával képzett szavaknak is benne kell lenniük $L$-ben, azaz, például $uvvw \\in L$. Mivel $v$ csupa $a$ betűből áll, ezért nyilvánvalóan $vv$ is csupa $a$ betűből fog állni. $uvw$ benne volt a nyelvben, hiszen a végén, a $w$ részszóban található $b$ betűk száma többszöröse volt a szó elején levő $a$ betűk számának (a bizonyítástóé független megjegyzés: mivel $|uv| \\leq n$, ezért $w$-be is eshetnek $a$ betűk!). Tehát ha pumpáljuk az $a$ betűk számát a szó elején, anélkül, hogy a $b$ betűk száma növekedne, ahogy azt az $uvvw$ szó esetén tettük, akkor az ilyen szavak nem lesznek benne a nyelvben, mert a $b$ betűk száma a felfelé pumpálás következtében már nem lesz egész többszöröse az $a$ betűk számának (elég nagy pumpálás esetén pedig már több $a$ betű lesz, mint $b$).

Mivel a bizonyítás elején feltettük, hogy $L$ reguláris, azonban találtunk olyan szót $L$-ben, melyre nem teljesül a pumpálási lemma, ezért ellentmondást kaptunk, azaz $L$ nem reguláris.
`,
  subsubsection.cell`2.22. f.`,
  md.cell`
Tegyük fel, hogy az

$$
L = \\{ x \\in \\{a, b\\}^{*} \\;|\\; \\text{$x$-nek nincs olyan prefixe, amiben több $b$ van, mint $a$}\\}
$$

nyelv reguláris. Ekkor, a pumpálási lemma szerint, adott valamilyen, $L$-től függő $n$, az elég hosszú szó hossza.

Válasszuk meg az $x \\in L$ szót a következőképpen:

$$
x = a^{n}b^{n}.
$$

A fenti választásunk olyan, hogy $|x| \\geq n$. Továbbá, bármilyen prefixét tekintjük $x$-nek (akár a teljes szót is), az $a$ betűk száma mindig nagyobb vagy egyenlő, mint a $b$ betűké.

A pumpálási lemma szerint ekkor $x$ felírható $x = uvw$ alakban, mely felbontásnak teljesítenie kell a következőket.

$|uv| \\leq n$, amiből következik, hogy az $uv$ részszó csupa $a$ betűből áll (hiszen $x$ $n$ darab $a$ betűvel kezdődik).

$|v| > 0$, amiből, ha összekapcsoljuk az előző ponttal, adódik, hogy $v$ csupa $a$ betűből áll (hiszen már $uv$ is csupa $a$ betűbőll állt).

Végül, a $v$ részszó pumpálásával képzett szavaknak is benne kell lenniük $L$-ben, azaz, például $uw \\in L$ (tehát lefelé pumpáltunk, $v^{0} = \\lambda$). $L$ olyan szavakat tartalmaz, melyek minden prefixe legalább annyi $a$ betűt tartalmaz, mint $b$ betűt. Ez teljesült az $x = uvw$ szóra is. Ugyanakkor, mivel $v$ csupa $a$ betűből áll, ezért az $uw$ szó biztosan kevesebb $a$ betűvel fog kezdődni, mint az $uvw$ szó. Ennek következtében pedig, ha elég hossz prefixét vesszük $uw$-nek (akár a teljes szót), akkor abban több $b$ betű lesz, mint $a$ betű.

Mivel a bizonyítás elején feltettük, hogy $L$ reguláris, azonban találtunk olyan szót $L$-ben, melyre nem teljesül a pumpálási lemma, ezért ellentmondást kaptunk, azaz $L$ nem reguláris.
`,
  section.cell`Állítások reguláris nyelvekkel kapcsolatban`,
  subsection.cell`2.29. feladat`,
  subsubsection.cell`2.29. a.`,
  md.cell`
Az állítás hamis, ellenpélda: $L_{1} = \\{ a^{n}b^{n} \\;|\\; n \\geq 1 \\}$, $L_{2} = \\{a, b\\}^{*}$.

**Megjegyzés**: Figyelem, ez az első gyakorlaton (8-10) tévesen igaz állításként szerepelt. Elnézést a figyelmetlenségért.
`,
  subsubsection.cell`2.29. b.`,
  md.cell`
Az állítás hamis, ellenpélda: $L_{1} = \\{ ab \\}$, $L_{2} = \\{ a^{n}b^{n} \\;|\\; n \\geq 1 \\}$.
`,
  subsubsection.cell`2.29. c.`,
  md.cell`
Az állítás hamis, ellenpélda: $L_{1} = \\{ a^{i}b^{j} \\;|\\; i \\leq j \\}$, $L_{2} = \\{ a^{i}b^{j} \\;|\\; i \\geq j \\}$.
`,
  subsubsection.cell`2.29. d.`,
  md.cell`
Az állítás igaz. Tegyük fel, hogy létezik olyan $M^{\\prime}$ véges automata, mely az $L^{\\prime}$-beli szavakat fogadja el. Mivel az ábécé, mely felett a nyelvek definiáltak, $\\Sigma = \\{a, b\\}$, ezért ez azt jelenti, hogy $M^{\\prime}$ minden olyan $\\{a, b\\}^{*}$-beli szót elfogad, mely nincs benne $L$-ben ($\\{a, b\\}^{*} \\setminus L$), és minden olyan szót elutasít, mely benne van $L$-ben. Ha elképzeljük az automatát, ekkor az elfogadó állapotok az $L^{\\prime}$-beli szavakkal érhetők el, míg az elutasító állapotok az $L$-beli szavakkal. Viszont, ha van egy ilyen $M^{\\prime}$ automatánk, akkor felcserélvén az elfogadó és elutasító állapotokat, egy olyan $M$ automatát kapnánk, mely az $L$-beli szavakat fogadja el. Ez viszont ellentmondás, hiszen az eredeti állítás szerint $L$-re nem tudunk véges automatát konstruálni.

TL;DR: Az állítás igaz, mert ha $L^{\\prime}$-re lenne véges automata, akkor $L$-re is lenne.
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
  excerpt:
    'Determinisztikus véges automatákat minimalizáltunk, valamint a pumpálási lemmával bizonyítottuk nyelvekről, hogy nem regulárisak.',
  cells,
}

module.exports = {
  meta,
  content,
}
