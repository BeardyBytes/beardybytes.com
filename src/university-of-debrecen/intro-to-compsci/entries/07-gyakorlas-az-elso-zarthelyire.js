const { DateTime } = require('luxon')
const { section, subsection, subsubsection } = require('../../../common/cells/heading')
const md = require('../../../common/cells/markdown')

const cells = [
  md.cell`
A gyakorló feladatsor elérhető a következő linken:

> [elso-zarthelyi-gyakorlo-feladatsor.pdf](./files/elso-zarthelyi-gyakorlo-feladatsor.pdf)
`,
  section.cell`Véges automatából reguláris kifejezés`,
  md.cell`
Kiegészítendő az eddig ismert két módszert (a „ránézésre megoldást”, valamint az állapottörlős eljárást), a következőkben megnézünk egy „egyenletrendszereken” alapuló megoldást a véges automatából reguláris kifejezés problémára.
`,
  subsection.cell`Reguláris kifejezések ekvivalenciája`,
  md.cell`
Ugyanazt a reguláris nyelvet általában több, egymástól különböző reguláris kifejezéssel is leírhatjuk. Ezek a kifejezések, melyek ugyanazt a nyelvet írják le, ekvivalensek. A következőkben felírunk néhány ismert ekvivalenciát, melyet felhasználhatunk a reguláris kifejezések átalakítására:

  * $(A + B)$ ugyanazt írja le, mint $(B + A)$.
  * $(A + B) + C$ ugyanazt írja le, mint $A + (B + C)$.
  * $A(B + C)$ ugyanazt írja le, mint $(AB + AC)$.
  * $(A + B)C$ ugyanazt írja le, mint $(AC + BC)$.
  * $(A + B)(C + D)$ ugyanazt írja le, mint $(AC + AD + BC + BD)$.
  * $AA^{*}$ ugyanazt írja le, mint $A^{*}A$.
  * $(A + A)$ ugyanazt írja le, mint $A$.
`,
  subsection.cell`A módszer`,
  md.cell`
Legyen adott az $M = (Q, \\Sigma, q_{0}, \\delta, A)$ (nem)determinisztikus véges automata, mely nem tartalmaz üres szó átmeneteket (ha vannak ilyen átmeneteink, akkor először alakítsuk át az automatát).

Ezután minden $q_{i} \\in Q$ állapothoz írjunk fel egy „egyenletet”:

$$
Q_i = \\bigcup\\limits_{q_i \\overset{a}{\\to} q_j} aQ_j \\cup \\begin{cases} \\{\\lambda\\} &,\\ q_i \\in A \\\\ \\emptyset &, \\text{ egyébként}\\end{cases}
$$

Elsőre a fenti kifejezést nehéz lehet megérteni, valamint tartalmaz ismeretlen jelöléseket is, ezért bontsuk fel elemeire:

  * $q_i \\overset{a}{\\to} q_j$
    * $a$-betűt olvasva átmehetünk a $q_{i}$ állapotból a $q_{j}$ állapotba.
  * $\\bigcup\\limits_{q_i \\overset{a}{\\to} q_j} aQ_j$
    * Vegyük az összes, $q_{i}$-ből kiinduló állapotátmenetet, készítsünk belőle egy $aQ_{j}$ kifejezést (ahol $a$ betűt olvasva $q_{j}$-be jutunk), majd vegyük ezek unióját.
  * $\\cup \\begin{cases} \\{\\lambda\\} &,\\ q_i \\in A \\\\ \\emptyset &, \\text{ egyébként}\\end{cases}$
    * Ha $q_{i}$ elfogadó állapot (azaz benne van $A$-ban), akkor még unionálunk a kifejezéshez egy $\\lambda$-t, egyébként pedig az üres nyelvet (azaz lényegében semmit). 

Ha a felírással készen vagyunk, akkor meg kell oldanunk a kapott „egyenletrendszert” $Q_{0}$-ra (ha $q_{0}$ a kezdőállapot).

  > **Figyelem**: A gyakorlaton tévesen szerepelt, hogy az egyenletrendszert bármely $Q_{i}$-re megoldva készen vagyunk. Ez azonban nem igaz, $Q_{i}$ mindig azt adja meg, hogy ha $q_{i}$ lenne az automata kezdőállapota, akkor mi lenne a vele ekvivalens reguláris kifejezés. Ha az eredeti $M$ automatánk kezdő állapota $q_{0}$, akkor az $M$ által elfogadott $L(M)$ nyelvet a $Q_{0}$-ra kapott reguláris kifejezés írja le.

Hogyan oldhatjuk meg az egyenletrendszert, milyen eszközök állnak a rendelkezésünkre?

  * A bal oldalt sosem kell alakítanunk, mindig csak a jobb oldallal kell dolgoznunk.
  * Használhatjuk a reguláris kifejezések közötti ekvivalenciákat az egyenletek átalakítására.
  * Bármelyik egyenletet beírhatjuk a másikba.
  * Alkalmazhatjuk az Arden lemmát:
    * Ha $L, U$ és $V$ reguláris nyelvek valamilyen $\\Sigma$ ábécé felett és $\\lambda \\notin U$, akkor
    $$
    L = UL + V \\quad \\Longleftrightarrow \\quad L = U^*V
    $$

A következőkben megnézzük három példán keresztül a módszer alkalmazását.
`,
  subsection.cell`6. feladat`,
  subsubsection.cell`6. a)`,
  md.cell`
Az automata két állapottal rendelkezik ($q_{1}, q_{2}$), ezért két egyenletünk lesz. Az automata által elfogadott nyelvet leíró reguláris kifejezést $Q_{1}$-re megoldva fogjuk kapni.
`,
  md.cell`
Írjuk fel tehát először $Q_{1}$-et:

$$
Q_{1} = bQ_{1} + aQ_{2}.
$$

A jobboldalon egy kéttagú unió szerepel: $b$-vel maradhatunk $q_{1}$-ben, ezért jelenik meg $bQ_{1}$, míg $a$-vel átléphetünk $q_{2}$-be, ezért lesz $aQ_{2}$.
`,
  md.cell`
Folytassuk $Q_{2}$-vel:

$$
Q_{2} = aQ_{2} + \\lambda.
$$

Itt csak egyetlen állapotátmenetet kellett figyelembe vennünk: $a$-val $q_{2}$-ben maradunk. Ezen felül megjelenik egy $\\lambda$ tag is, hiszen $q_{2}$ elfogadó állapot.
`,
  md.cell`
Az egyenleteket felírva, kezdjük el a megoldást! Dolgozzunk először a második egyenletünkkel:

$$
Q_{2} = aQ_{2} + \\lambda.
$$

Erre alkalmazhatjuk az Arden lemmát, hiszen (a nyelveket reguláris kifejezésekkel leírva):

  * $L = Q_{2}$,
  * $U = a$,
  * $V = \\lambda$.

Azaz

$$
Q_{2} = a^{*}\\lambda = a^{*}.
$$
`,
  md.cell`
Az első egyenletünkben $Q_{2}$ helyére beírhatjuk az előző egyenlet jobb oldalát:

$$
Q_{1} = bQ_{1} + a(a^{*}) = bQ_{1} + aa^{*}.
$$
`,
  md.cell`
Végül újra alkalmazhatjuk az Arden lemmát:

$$
Q_{1} = b^{*}aa^{*}.
$$
`,
  md.cell`
Mivel $q_{1}$ az automata kezdőállapota, ezért készen vagyunk, az automata által elfogadott nyelvet leírhatjuk a

$$
b^{*}aa^{*}
$$

reguláris kifejezéssel.
`,
  subsubsection.cell`6. b)`,
  md.cell`
Írjuk fel az egyenletrendszert:

$$
Q_{1} = bQ_{1} + aQ_{2} + \\lambda
$$
$$
Q_{2} = bQ_{2} + cQ_{1} + \\lambda
$$
`,
  md.cell`
Kezdjük a megoldást a második egyenlettel:

$$
\\begin{aligned}
Q_{2} &= bQ_{2} + cQ_{1} + \\lambda & \\\\
Q_{2} &= b^{*}(cQ_{1} + \\lambda) \\quad &\\text{(Arden lemma)} \\\\
Q_{2} &= b^{*}cQ_{1} + b^{*} \\quad &\\text{(konkatenáció)}
\\end{aligned}
$$
`,
  md.cell`
Folytassuk $Q_{1}$-gyel:

$$
\\begin{aligned}
Q_{1} &= bQ_{1} + aQ_{2} + \\lambda & \\\\
Q_{1} &= bQ_{1} + a(b^{*}cQ_{1} + b^{*}) + \\lambda \\quad & \\text{(beírunk $Q_{2}$ helyére)} \\\\
Q_{1} &= bQ_{1} + ab^{*}cQ_{1} + ab^{*} + \\lambda \\quad & \\text{(konkatenáció)} \\\\
Q_{1} &= (b + ab^{*}c)Q_{1} + ab^{*} + \\lambda \\quad & \\text{(kiemelünk $Q_{1}$ elé)} \\\\
Q_{1} &= (b + ab^{*}c)^{*}(ab^{*} + \\lambda) \\quad & \\text{(Arden lemma)} \\\\
\\end{aligned}
$$
`,
  md.cell`
Készen vagyunk, a megoldás a következő:

$$
(b + ab^{*}c)^{*}(ab^{*} + \\lambda).
$$
`,
  subsubsection.cell`6. c)`,
  md.cell`
Írjuk fel az egyenletrendszert:

$$
\\begin{aligned}
Q_{1} &= aQ_{2} + bQ_{3} \\\\
Q_{2} &= bQ_{2} + aQ_{3} + \\lambda \\\\
Q_{3} &= aQ_{1} + \\lambda
\\end{aligned}
$$
`,
  md.cell`
Kezdjük a megoldást a második egyenlettel:

$$
\\begin{aligned}
Q_{2} &= bQ_{2} + aQ_{3} + \\lambda & \\\\
Q_{2} &= b^{*}(aQ_{3} + \\lambda) \\quad &\\text{(Arden lemma)} \\\\
Q_{2} &= b^{*}aQ_{3} + b^{*} \\quad &\\text{(konkatenáció)} \\\\
Q_{2} &= b^{*}a(aQ_{1} + \\lambda) + b^{*} \\quad &\\text{(beírunk $Q_{3}$ helyére)} \\\\
Q_{2} &= b^{*}aaQ_{1} + b^{*}a + b^{*} \\quad &\\text{(konkatenáció)}
\\end{aligned}
$$
`,
  md.cell`
Folytassuk az első egyenlettel:

$$
\\begin{aligned}
Q_{1} &= aQ_{2} + bQ_{3} \\\\
Q_{1} &= aQ_{2} + b(aQ_{1} + \\lambda) \\quad &\\text{(beírunk $Q_{3}$ helyére)} \\\\
Q_{1} &= aQ_{2} + baQ_{1} + b \\quad &\\text{(konkatenáció)} \\\\
Q_{1} &= a(b^{*}aaQ_{1} + b^{*}a + b^{*}) + baQ_{1} + b \\quad &\\text{(beírunk $Q_{2}$ helyére)} \\\\
Q_{1} &= ab^{*}aaQ_{1} + ab^{*}a + ab^{*} + baQ_{1} + b \\quad &\\text{(konkatenáció)} \\\\
Q_{1} &= (ab^{*}aa + ba)Q_{1} + ab^{*}a + ab^{*} + b \\quad &\\text{(kiemelünk $Q_{1}$ elé)} \\\\
Q_{1} &= (ab^{*}aa + ba)^{*}(ab^{*}a + ab^{*} + b) \\quad &\\text{(Arden lemma)} \\\\
\\end{aligned}
$$
`,
  md.cell`
Készen vagyunk, a megoldás a következő:

$$
(ab^{*}aa + ba)^{*}(ab^{*}a + ab^{*} + b).
$$
`,
]

const meta = {
  order: 7,
  layout: 'practice',
  urlTitle: '07-gyakorlas-az-elso-zarthelyire',
  publishedAt: DateTime.local(2021, 10, 19, 0, 30),
  draft: false,
}

const content = {
  title: '7. gyakorlat – Gyakorlás az első zárthelyire',
  excerpt: 'Átismételjük azokat az algoritmusokat és megoldási recepteket, melyeket az előző gyakorlatokon tanultunk.',
  cells,
}

module.exports = {
  meta,
  content,
}
