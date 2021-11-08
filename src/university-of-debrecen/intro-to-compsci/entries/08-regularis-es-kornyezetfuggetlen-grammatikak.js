const { DateTime } = require('luxon')
const kroki = require('../../../common/cells/kroki')
const md = require('../../../common/cells/markdown')
const { section, subsection, subsubsection } = require('../../../common/cells/heading')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [08-regularis-es-kornyezetfuggetlen-grammatikak-feladatsor.pdf](./files/08-regularis-es-kornyezetfuggetlen-grammatikak-feladatsor.pdf)
`,
  section.cell`Reguláris grammatikából véges automata`,
  subsection.cell`Reguláris grammatika`,
  md.cell`
Egy környezetfüggetlen grammatikát jobbreguláris grammatikának (vagy egyszerűen csak reguláris grammatikának) nevezünk, ha minden helyettesítési szabálya

  * $A \\rightarrow aB$,
  * $A \\rightarrow a$,
  * vagy $A \\rightarrow \\lambda$ alakú,

ahol $A$ és $B$ nemterminálisok, $a$ pedig valamilyen terminális szimbólum.
`,
  subsection.cell`Az átalakítás algoritmusa`,
  md.cell`
Legyen adott a $G = (N, T, S, P)$ jobbreguláris grammatika. Írjunk fel egy olyan $M = (Q, \\Sigma, q_{S}, \\delta, F)$ véges automatát, melyre teljesül, hogy $L(G) = L(M)$!
`,
  md.cell`
  1. Legyen az automata bemeneti ábécéje a grammatika terminálisainak halmaza, azaz $\\Sigma = T$.
  1. Az automata tartalmazzon a grammatika minden $A \\in N$ nemterminális szimbólumához egy $q_{A}$ állapotot!
     * Az automata $q_{S}$ kezdőállapota a grammatika $S$ mondatszimbólumának megfelelő állapot lesz.
     * Amennyiben a grammatika helyettesítési szabályai között van $A \\rightarrow a$ alakú, akkor készítsünk egy speciális $q_{ACC}$ állapotot is.
  1. Az elfogadó állapotok $F$ halmaza a következőkből fog állni:
     * Ha létezik, akkor a speciális $q_{ACC}$ állapot.
     * Minden olyan $A \\in N$ nemterminálisnak megfelelő $q_{A}$ állapot, melyhez tartozik $A \\rightarrow \\lambda$ alakú szabály.
  1. Végül, az állapotátmenetek a következő módon hozzuk létre:
     * Minden $A \\rightarrow aB$ alakú szabályhoz adjunk hozzá egy $\\delta(q_{A}, a) = q_{B}$ állapotátmenetet. Azaz, az $A$-nak megfelelő állapotban $a$ betűt olvasva átléphetünk a $B$-nek megfelelő állapotba.
     * Minden $A \\rightarrow a$ alakú szabályhoz adjunk hozzá egy $\\delta(q_{A}, b) = q_{ACC}$ állapotátmenetet.
     * Az $A \\rightarrow \\lambda$ alakú szabályokhoz nem kell állapotátmenetet hozzáadnunk.
`,
  subsection.cell`4. feladat`,
  subsubsection.cell`4. a)`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_4a {
  rankdir=LR;
  node [shape = point; color = white ]; F;
  node [shape = doublecircle; color = black]; C;
  node [shape = circle];

  F -> S;
  S -> A [label=a]
  S -> C [label=b]
  A -> S [label=a]
  A -> B [label=b]
  B -> C [label=a]
  B -> A [label=b]
  C -> B [label=a]
  C -> S [label=b]
}`,
  subsubsection.cell`4. b)`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_4b {
  rankdir=LR;
  node [shape = point; color = white ]; F;
  node [shape = doublecircle; color = black]; S, ACC;
  node [shape = circle];

  F -> S;
  S -> S [label=b]
  S -> A [label=a]

  A -> A [label=a]
  A -> B [label=b]
  A -> ACC [label=b]

  B -> S [label=b]
}`,
  subsubsection.cell`4. c)`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_4c {
  rankdir=LR;
  node [shape = point; color = white ]; F;
  node [shape = doublecircle; color = black]; ACC;
  node [shape = circle];

  F -> S;
  S -> S1 [label=a]
  S -> S2 [label=a]
  S -> B [label=b]
  S1 -> A [label=b]
  S2 -> S3 [label=b]
  S3 -> ACC [label=a]

  A -> ACC [label=b]
  A -> B [label=a]
  A -> A [label=b]

  B -> B [label=a]
  B -> A [label=a]
}`,
  section.cell`Véges automatából reguláris grammatika`,
  md.cell`
A másik irány is lehetséges, azaz adott $M$ véges automatához felírható olyan $G$ reguláris grammatika, hogy $L(M) = L(G)$. Az algoritmust nem fejteném ki részletesen, hiszen lényegéven csak a grammatikából véges automatát képző algoritmus fordítottja.

Megjegyzés: ha szeretnénk automatához grammatikát készíteni, akkor előbb távolítsuk el az automatából a $\\lambda$-átmeneteket!
`,
  subsection.cell`5. feladat`,
  md.cell`
Legyen $G = (N, T, S, P)$, ahol:

  * $N = \\{S, B, C, D\\}$,
  * $T = \\{a, b\\}$,
  * az átírási szabályok $P$ halmaza pedig a következő elemekből áll:
    * $S \\rightarrow aB$,
    * $S \\rightarrow bD$,
    * $S \\rightarrow \\lambda$,
    * $B \\rightarrow aB$,
    * $B \\rightarrow bC$,
    * $C \\rightarrow bC$,
    * $C \\rightarrow aB$,
    * $C \\rightarrow \\lambda$,
    * $D \\rightarrow aD$,
    * $D \\rightarrow bD$.
`,
  section.cell`Környezetfüggetlen grammatikák`,
  subsection.cell`Definíció`,
  md.cell`
Egy környezetfüggetlen grammatika egy olyan $G = (N, T, S, P)$ rendezett négyes, ahol

  * $N$ és $T$ véges, diszjunkt halmazok,
  * $S \\in N$,
  * $P$ pedig a helyettesítési szabályok véges halmaza, ahol minden helyettesítési szabály $A \\rightarrow \\alpha$ alakú ($\\alpha \\in (N \\cup T)^{*}$).
`,
  subsection.cell`6. feladat`,
  md.cell`
Kezdjük azzal, hogy megmutatjuk: minden reguláris nyelv generálható $R$ típusú grammatikával! Tudjuk, hogy minden reguláris nyelv generálható jobbreguláris grammatikával, mely grammatikák a következő alakú átírási szabályokat tartalmazhatnak:

  * $A \\rightarrow aB$,
  * $A \\rightarrow a$,
  * $A \\rightarrow \\lambda$.

Vegyük észre, hogy az $A \\rightarrow a$ alakú szabályok helyettesíthetők két szabállyal:

  * $A \\rightarrow aB$,
  * $B \\rightarrow \\lambda$.

Ez pedig pontosan azt jelenti, hogy csak $A \\rightarrow aB$ és $A \\rightarrow \\lambda$ alakú szabályokkal felírhatunk tetszőleges, reguláris nyelvet generáló grammatikát.
`,
  md.cell`
Most már csak azt kell megmutatnunk, hogy $R$ szabályaival felírható olyan grammatika is, mely nem-reguláris nyelvet generál. A legegyszerűbb, ha választunk egy olyan nyelvet, melyről tudjuk, hogy nem reguláris, majd megpróbáljuk felírni $R$ szabályaival. Egy ilyen választás lehet az $L = \\{a^{n}b^{n}\\ | n \\geq 1\\}$ nyelv, melyről tudjuk, hogy környezetfüggetlen.

Pontosan ezt a nyelvet generálhatjuk a következő szabályokkal:

  * $S \\rightarrow aA$,
  * $A \\rightarrow Sb$,
  * $A \\rightarrow bB$,
  * $B \\rightarrow \\lambda$.

Ezzel pedig készen vagyunk.
`,
  subsection.cell`1. feladat`,
  subsubsection.cell`1. a)`,
  md.cell`
  * $S \\rightarrow aSa$,
  * $S \\rightarrow aSb$,
  * $S \\rightarrow bSa$,
  * $S \\rightarrow bSb$,
  * $S \\rightarrow a$.
`,
  subsubsection.cell`1. b)`,
  md.cell`
  * $S \\rightarrow aSa$,
  * $S \\rightarrow aSb$,
  * $S \\rightarrow bSa$,
  * $S \\rightarrow bSb$,
  * $S \\rightarrow aa$,
  * $S \\rightarrow bb$.
`,
  subsubsection.cell`1. c)`,
  md.cell`
  * $S \\rightarrow aAa$,
  * $S \\rightarrow bAb$,
  * $A \\rightarrow aAa$,
  * $A \\rightarrow aAb$,
  * $A \\rightarrow bAa$,
  * $A \\rightarrow bAb$,
  * $A \\rightarrow a$,
  * $B \\rightarrow aBa$,
  * $B \\rightarrow aBb$,
  * $B \\rightarrow bBa$,
  * $B \\rightarrow bBb$,
  * $B \\rightarrow b$,
`,
  subsection.cell`2. feladat`,
  subsubsection.cell`2. a)`,
  md.cell`
  * $S \\rightarrow aSb \\:|\\: Sb \\:|\\: \\lambda$
  `,
  subsubsection.cell`2. b)`,
  md.cell`
  * $S \\rightarrow aSb \\:|\\: Sb \\:|\\: b$
  `,
  subsubsection.cell`2. c)`,
  md.cell`
  * $S \\rightarrow aSbb \\:|\\: \\lambda$
  `,
  subsubsection.cell`2. d)`,
  md.cell`
  * $S \\rightarrow aSbb \\:|\\: aSb \\:|\\: \\lambda$
  `,
  subsubsection.cell`2. e)`,
  md.cell`
  * $S \\rightarrow aSbb \\:|\\: aSb \\:|\\: aS \\:|\\: \\lambda$
  `,
  subsubsection.cell`2. f)`,
  md.cell`
  * $S \\rightarrow aSbb \\:|\\: aSb \\:|\\: aS \\:|\\: a$
  `,
  subsection.cell`3. feladat`,
  subsubsection.cell`3. a)`,
  md.cell`
$S$ minden behelyetteítése vagy az üres szóval vagy pontosan $1$ darab $a$ betűvel és $1$ darab $b$ betűvel bővíti a képzett szót. Mivel $S$ az egyetlen nemterminális, és minden behelyettesítése ugyanannyi $a$ és $b$ betűt ad a képzett szóhoz, ezért a generált szavak csak azonos számú $a$ és $b$ betűt tartalmazhatnak.

Szó, melyet a grammatika nem generál:

  * $aabb$.
`,
  subsubsection.cell`3. b)`,
  md.cell`
Szó, melyet a grammatika nem generál:

  * $aabbbbaa$.
`,
]

const meta = {
  order: 8,
  layout: 'practice',
  urlTitle: '08-regularis-es-kornyezetfuggetlen-grammatikak',
  publishedAt: DateTime.local(2021, 11, 8, 8, 40),
  draft: false,
}

const content = {
  title: '8. gyakorlat – Reguláris és környezetfüggetlen grammatikák',
  excerpt:
    'Véges automatából készítünk reguláris grammatikát, majd fordítva. Ezután környezetfüggetlen grammatikákkal foglalkozunk.',
  cells,
}

module.exports = {
  meta,
  content,
}
