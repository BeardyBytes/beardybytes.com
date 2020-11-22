const { DateTime } = require('luxon')
const kroki = require('../../../common/cells/kroki')
const md = require('../../../common/cells/markdown')
const { section, subsection, subsubsection } = require('../../../common/cells/heading')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [08-chomsky-normalforma-cyk-algoritmus-feladatsor.pdf](./files/08-chomsky-normalforma-cyk-algoritmus-feladatsor.pdf)
`,
  section.cell`Reguláris grammatikák`,
  md.cell`
Ismétlés:

  * [reguláris grammatika](07-regularis-es-kornyezetfuggetlen-grammatikak.html#regularis-grammatika)
  * [környezetfüggetlen grammatika](07-regularis-es-kornyezetfuggetlen-grammatikak.html#definicio)
`,
  subsection.cell`5. feladat`,
  md.cell`
Ebben a feladatban környezetfüggetlen grammatikával generált, azonban reguláris nyelvekhez kell felírnunk reguláris grammatikát.

Egy lehetséges stratégia, ha először felírunk egy reguláris kifejezést, majd ezt írjuk át reguláris grammatikává.
`,
  subsection.cell`5. a)`,
  md.cell`
Reguláris kifejezés:

  * $(a + ab)((a + ab)(a + ab)^{*})$

Reguláris grammatika:

  * $S \\rightarrow a \\:|\\: aB \\:|\\: aX \\:|\\: aX_{1}$
  * $B \\rightarrow b$
  * $X_{1} \\rightarrow bX$
  * $X \\rightarrow aY \\:|\\: aY_{1}$
  * $Y_{1} \\rightarrow bY$
  * $Y \\rightarrow aS \\:|\\: aS_{1}$
  * $S_{1} \\rightarrow bS$
`,
  subsection.cell`5. b)`,
  md.cell`
Reguláris kifejezés:

  * $(a + b)^{*}ab(ab + b)(ab + b)^{*}$

Reguláris grammatika:

  * $S \\rightarrow aS \\:|\\: bS \\:|\\: aX_{1}$
  * $X_{1} \\rightarrow bX$
  * $X \\rightarrow aB \\:|\\: aY_{1} \\:|\\: bY$
  * $B \\rightarrow b$
  * $Y_{1} \\rightarrow bY$
  * $Y \\rightarrow aY_{1} \\:|\\: bY \\:|\\: aB \\:|\\: b$
`,
  subsection.cell`5. c)`,
  md.cell`
Reguláris kifejezés:

  * $(ab + ba)^{*}(ab + aab)$

Reguláris grammatika:

  * $S \\rightarrow aS_{1} \\:|\\:  bS_{2} \\:|\\: aS_{3} \\:|\\: aS_{4}$
  * $S_{1} \\rightarrow bS$
  * $S_{2} \\rightarrow aS$
  * $S_{3} \\rightarrow b$
  * $S_{4} \\rightarrow aS_{5}$
  * $S_{5} \\rightarrow b$
`,
  section.cell`Grammatikák egyértelműsége`,
  subsection.cell`Definíció`,
  md.cell`
Az olyan nyelvtanokat, ahol minden mondathoz egy és csakis egy levezetési fa tartozik, **egyértelmű nyelvtanoknak** mondjuk. Ugyanannak a mondatnak továbbra is lehet több levezetése, ezek azonban nem lehetnek lényegesen különbözőek.
`,
  subsection.cell`6. feladat`,
  subsubsection.cell`6. a)`,
  md.cell`
Példa:
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_6a1 {
  node [shape = plaintext];
  edge [arrowhead = none];

  S0, S1, S2, S3, S4 [label="S"]
  A0, A1, A2 [label="a"]

  S0 -> S1
  S0 -> S2
  S1 -> S3
  S1 -> S4
  S2 -> A0
  S3 -> A1
  S4 -> A2
}`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_6a2 {
  node [shape = plaintext];
  edge [arrowhead = none];

  S0, S1, S2, S3, S4 [label="S"]
  A0, A1, A2 [label="a"]

  S0 -> S1
  S0 -> S2
  S1 -> A0
  S2 -> S3
  S2 -> S4
  S3 -> A1
  S4 -> A2
}`,
  md.cell`
Azonos nyelvet generáló egyértelmű nyelvtan:

  * $S \\rightarrow aS_{1} \\:|\\: bS_{1}$
  * $S_{1} \\rightarrow aS_{1} \\:|\\: bS_{1} \\:|\\: a \\:|\\: b$
`,
  subsubsection.cell`6. b)`,
  md.cell`
Példa:
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_6b1 {
  node [shape = plaintext];
  edge [arrowhead = none];

  S [label="S"]
  A0 [label="A"]
  B [label="B"]
  A1 [label="A"]
  L0, L1 [label="λ"]
  a [label="a"]

  S -> A0
  S -> B
  S -> A1
  A0 -> a
  B -> L0
  A1 -> L1
}`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_6b2 {
  node [shape = plaintext];
  edge [arrowhead = none];

  S [label="S"]
  A0 [label="A"]
  B [label="B"]
  A1 [label="A"]
  L0, L1 [label="λ"]
  a [label="a"]

  S -> A0
  S -> B
  S -> A1
  A0 -> L0
  B -> L1
  A1 -> a
}`,
  md.cell`
Azonos nyelvet generáló egyértelmű nyelvtan:

  * $S \\rightarrow S_{a} \\:|\\: S_{b} \\:|\\: S_{ab} \\:|\\: S_{ba} \\:|\\: S_{aba} \\:|\\: \\lambda$
  * $S_{ab} \\rightarrow aS_{1}$
  * $S_{1} \\rightarrow aS_{1} \\:|\\: bS_{2}$
  * $S_{2} \\rightarrow bS_{2} \\:|\\: \\lambda$
  * $S_{a} \\rightarrow aS_{3}$
  * $S_{3} \\rightarrow aS_{3} \\:|\\: \\lambda$
  * $S_{b} \\rightarrow bS_{4}$
  * $S_{4} \\rightarrow bS_{4} \\:|\\: \\lambda$
  * $S_{ba} \\rightarrow bS_{5}$
  * $S_{5} \\rightarrow bS_{5} \\:|\\: aS_{6}$
  * $S_{6} \\rightarrow aS_{6} \\:|\\: \\lambda$
  * $S_{aba} \\rightarrow aS_{8}$
  * $S_{8} \\rightarrow aS_{8} \\:|\\: bS_{9}$
  * $S_{9} \\rightarrow bS_{9} \\:|\\: aS_{10}$
  * $S_{10} \\rightarrow aS_{10} \\:|\\: \\lambda$
`,
  subsubsection.cell`6. c)`,
  md.cell`
Példa:
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_6c1 {
  node [shape = plaintext];
  edge [arrowhead = none];

  S0 [label="S"]
  a0 [label="a"]
  S1 [label="S"]
  b0 [label="b"]
  a1 [label="a"]
  a2 [label="a"]
  S2 [label="S"]
  b1 [label="b"]
  L0 [label="λ"]

  S0 -> a0, S1, b0
  S1 -> a1, a2, S2, b1
  S2 -> L0
}`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_6c2 {
  node [shape = plaintext];
  edge [arrowhead = none];

  S0 [label="S"]
  a0 [label="a"]
  a1 [label="a"]
  S1 [label="S"]
  b0 [label="b"]
  a2 [label="a"]
  S2 [label="S"]
  b1 [label="b"]
  L0 [label="λ"]

  S0 -> a0, a1, S1, b0
  S1 -> a2, S2, b1
  S2 -> L0
}`,
  md.cell`
Azonos nyelvet generáló egyértelmű nyelvtan:

  * $S \\rightarrow S_{1} \\:|\\: \\lambda$
  * $S_{1} \\rightarrow aS_{1}b \\:|\\: S_{2}$
  * $S_{2} \\rightarrow aaS_{2}b \\:|\\: \\lambda$
`,
  subsubsection.cell`6. d)`,
  md.cell`
Példa:
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_6d1 {
  node [shape = plaintext];
  edge [arrowhead = none];

  S0 [label="S"]
  a0 [label="a"]
  b0 [label="b"]
  S1 [label="S"]
  L0 [label="λ"]

  S0 -> a0, b0, S1
  S1 -> L0
}`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_6d2 {
  node [shape = plaintext];
  edge [arrowhead = none];

  S0 [label="S"]
  a0 [label="a"]
  S1 [label="S"]
  b0 [label="b"]
  L0 [label="λ"]

  S0 -> a0, S1, b0
  S1 -> L0
}`,
  md.cell`
Azonos nyelvet generáló egyértelmű nyelvtan:

  * $S \\rightarrow S_{1} \\:|\\: \\lambda$
  * $S_{1} \\rightarrow aS_{1}b \\:|\\: abS_{1} \\:\\ ab$
`,
  section.cell`Chomsky-normálforma`,
  subsection.cell`Definíció`,
  md.cell`
Egy környezetfüggetlen nyelvtan **Chomsky-normálformában** (Chomsky Normal Form, CNF) van, amennyiben minden helyettesítési szabálya

  * vagy $A \\rightarrow BC$ (ahol $A, B$ és $C$ egymástól nem feltétlenül különböző nemterminálisok),
  * vagy $A \\rightarrow a$ (ahol $a$ terminális)

alakú.
`,
  subsection.cell`Tétel`,
  md.cell`
Legyen $G$ egy tetszőleges környezetfüggetlen nyelvtan. Ekkor létezik olyan, Chomsky-normálformában levő $G_{CNF}$ nyelvtan, hogy

$$
L(G) = L(G_{CNF}) \\setminus \\{\\lambda\\}.
$$
`,
  subsection.cell`A normálformára hozás algoritmusa`,
  md.cell`
Legyen $G$ egy környezetfüggetlen nyelvtan. Ekkor a fenti tételnek megfelelő $G_{CNF}$ nyelvtan előállítható a következő lépések alkalmazásával:

  1. Először távolítsuk el az úgynevezett törlőszabályokat!
  1. Szüntessük meg a láncszabályokat.
  1. A fennmaradó helyettesítési szabályból képezzünk a normálformának megfelelő alakú szabályokat.

Nézzük meg részletesen, hogy miként hajthatók végre a fenti lépések!

**A törlőszabályok eltávolítása**

Elsőként szeretnénk megszabadulni az $A \\rightarrow \\lambda$ alakú szabályoktól (ezek a törlőszabályok). Ehhez a következő lépésekre van szükség:

  1. Jelölje $G$ helyettesítési szabályainak halmazát $P$!
  1. Gyűjtsük össze a törlődő nemterminálisokat! Például, ha adottak az

     * $A \\rightarrow a \\:|\\:B$,
     * $B \\rightarrow \\lambda$
     
     szabályok, akkor mind $B$, mind $A$ törlődő nemterminális lesz.
  1. Vegyük fel a $P_{1}$ halmazt, mely legyen kezdetben üres. Ezután minden $A \\rightarrow \\alpha \\in P$ szabályra végezzük el a következőt:
     * Ha $\\alpha = \\lambda$, azaz törlőszabállyal van dolgunk, akkor nem csinálunk semmit.
     * Ha $\\alpha \\neq \\lambda$ és $\\alpha$ nem tartalmaz törlődő nemterminálist, akkor a szabályt adjuk hozzá $P_{1}$-hez.
     * Ha $\\alpha \\neq \\lambda$, ugyanakkor $\\alpha$ tartalmaz egy vagy több törlődő nemterminálist, akkor adjuk hozzá a szabályt $P_{1}$-hez, továbbá adjuk hozzá $P_{1}$-hez az összes különböző szabályt, melyet úgy kaptunk, hogy $\\alpha$-ból egy vagy több törlődő nemterminálist eltávolítottunk. Azaz, ha $A$ és $B$ törlődő nemterminálisok, és adott a $C \\rightarrow aAB$ szabály, akkor a $P_{1}$-be kerülő szabályok a következők lesznek:
       * $C \\rightarrow aAB$
       * $C \\rightarrow aA$
       * $C \\rightarrow aB$
       * $C \\rightarrow a$
  1. Készen vagyunk, az új helyettesítési szabályokat $P_{1}$ tartalmazza.

**A láncszabályok eltávolítása**

A továbbiakban az előző lépésben kapott $P_{1}$ halmazzal fogunk dolgozni.

  1. Láncszabálynak nevezzük az $A \\rightarrow B$ alakú helyettesítési szabályokat.
  1. Jelölje $G$ neterminálisainak halmazát $N$! Az összes $A \\in N$ nemterminálishoz keressük meg azokat nemterminálisokat, melyek láncszabályok alkalmazásával elérhetők $A$-ból! Például, ha adottak a következő szabályok:

     * $A \\rightarrow B \\:|\\: C$
     * $B \\rightarrow b$
     * $C \\rightarrow D$
     * $D \\rightarrow d$

     akkor $A$-ból $B$-t és $D$-t érhetjük el láncszabályokon keresztül.
  1. Ha $A$-ból láncszabályokon keresztül elérhető $B$, akkor minden $B \\rightarrow \\alpha$ nem láncszabály esetén vegyünk fel $P_{1}$-be egy új, $A \\rightarrow \\alpha$ szabályt. Az előző példában tehát a következő szabályokat kell felvennünk:

     * $A \\rightarrow b$
     * $A \\rightarrow d$
     * $C \\rightarrow d$

  1. Végül távolítsuk el $P_{1}$-ből az összes láncszabályt.

**A szabályok megfelelő alakra hozása**

Utolsó lépésként, felhasználva a $P_{1}$-beli helyettesítési szabályokat, új, a normálformának megfelelő alakú szabályokat képzünk.

  1. Vegyünk fel egy új halmazt, mely a már megfelelő helyettesítési szabályokat fogja tartalmazni. Jelölje ezt a halmazt $P_{CNF}$.
  1. $G$ minden $a$ terminálisához vegyünk fel egy $X_{a} \\rightarrow a$ alakú szabályt $P_{CNF}$-be.
  1. $P_{1}$ egyes szabályaira végezzük el a következőket:
     * Ha a szabály $A \\rightarrow a$ alakú, és $A$ a $G$ grammatika mondatszimbóluma, akkor a szabályt hozzáadjuk $P_{CNF}-hez$, egyébként nem csinálunk semmit.
     * Egyébként helyettesítsük a szabály jobb oldalán szereplő összes terminálist a második lépésben létrehozott megfelelő nemterminálissal. Ezt követően képezzünk új szabályokat oly módon, hogy a szabályok jobb oldalán mindig két nemterminális álljon. Például, ha adott az
       * $A \\rightarrow aBc$
       
       szabály, akkor a következő szabályokat fogjuk hozzáadni $P_{CNF}$-hez:
       * $A \\rightarrow X_{a}A_{1}$
       * $A_{1} \\rightarrow BX_{c}$
  1. Készen vagyunk, $P_{CNF}$ már csak megfelelő alakú helyettesítési szabályokat tartalmaz.
`,
  subsection.cell`1. feladat`,
  subsubsection.cell`1. a)`,
  md.cell`
Első lépésként azonosítjuk a törlődő nemterminálisokat. Mivel van két törlőszabályunk, $A \\rightarrow \\lambda$ és $B \\rightarrow \\lambda$, ezért $A$ és $B$ biztosan törlődők lesznek. Mivel az $S \\rightarrow ABA$ szabály jobb oldala csupa törlődő nemterminálisból áll, ezért természetesen $S$ is törlődő lesz.

Ezután, a meglévő szabályok alapján elkészítjük az új szabályhalmazt:

  * $A \\rightarrow aA$
    * $A \\rightarrow aA$
    * $A \\rightarrow a$
  * $B \\rightarrow bB$
    * $B \\rightarrow bB$
    * $B \\rightarrow b$
  * $S \\rightarrow ABA$
    * $S \\rightarrow ABA$
    * $S \\rightarrow A$
    * $S \\rightarrow B$
    * $S \\rightarrow AB$
    * $S \\rightarrow BA$
    * $S \\rightarrow AA$

A következő lépés a láncszabályok kiküszöbölése. A fenti halmaz két láncszabályt tartalmaz, melyek a következők:

  * $S \\rightarrow A$
  * $S \\rightarrow B$

Ez azt jelenti, hogy az $S$ nemterminálisból láncszabályon keresztül elérhető az $A$ és a $B$ nemterminális. Ennek megfelelően a következő új szabályokat kell hozzáadnunk:

  * $S \\rightarrow aA$
  * $S \\rightarrow a$
  * $S \\rightarrow bB$
  * $S \\rightarrow b$

Végül hozzuk Chomsky-normálformára a nyelvtant:

  * $X_{a} \\rightarrow a$
  * $X_{b} \\rightarrow b$
  * $A \\rightarrow X_{a}A$
  * $B \\rightarrow X_{b}B$
  * $S \\rightarrow a$
  * $S \\rightarrow b$
  * $S \\rightarrow X_{a}A$
  * $S \\rightarrow X_{b}B$
  * $S \\rightarrow AB$
  * $S \\rightarrow BA$
  * $S \\rightarrow AA$
  * $S \\rightarrow AS_{1}$
  * $S_{1} \\rightarrow BA$
`,
  section.cell`Cocke-Younger-Kasami algoritmus`,
  md.cell`
A CYK-algoritmus segítségével eldönthetjük egy adott szóról, hogy generálja-e egy adott, Chomsky-normálformában levő grammatika.

Az algoritmus működésének részletes leírása megtalálható itt:

  * [A CYK algoritmus](https://gyires.inf.unideb.hu/KMITT/b24/ch07s07.html#cyk_alg)

Itt csupán annyit jegyeznék meg, hogy az algoritmus lentről fölfelé haladva próbálja a szó egyes részszóit két részre bontani, majd ezeket a részeket egy-egy nemterminálisból levezetni. Az algoritmus végrehajtásához használt mátrix (piramis) végül nem csak azt mondja meg, hogy a szót generálja-e a grammatika, hanem megadja a szó levezetését is.
`,
  subsection.cell`3. feladat`,
  md.cell`
Az algoritmus első lépése a mátrix aljának kitöltése. A vizsgálandó szó minden szimbólumához tartozni fog egy cella, mely cellába azokat a nemterminálisokat írjuk, melyekkel a megfelelő szimbólum generálható.
`,
  md.cell`<img src="./files/08-cyk-1.svg">`,
  md.cell`
A mátrix következő szintje eggyel kevesebb dobozt fog tartalmazni. Minden doboz alatt két másik doboz lesz, hiszen a Chomsky-normálforma minden szabályának jobb oldalán legfeljebb két nemterminális állhat.

Balról jobbra haladva, minden dobozban azt kell megnéznünk, hogy van-e olyan helyettesítési szabály, melynek jobb oldalán a lenti két doboz nemterminálisai vannak. Például, ha a két lenti dobozban $A$ és $B$ szerepel, akkor $\\rightarrow AB$ jobb oldallal rendelkező szabályt keresünk.

Ha találunk megfelelő szabályt, akkor a dobozba a szabály bal oldalán szereplő nemterminális írjuk, ha pedig nem, akkor a dobozt kihúzzuk.
`,
  md.cell`<img src="./files/08-cyk-2.svg">`,
  md.cell`
Fentebb lépve ismét eggyel kevesebb dobozt kell létrehoznunk. Ezúttal már minden dobozhoz egy 3 szimbólum hosszúságú részszó tartozik. Az egyes dobozokban azt kell megvizsgálnunk, hogy a megfelelő részszó generálható-e a grammatika valamely szabályával. Ezt a vizsgálatot úgy végezzük el, hogy a szót felbontjuk két részre, és megnézzük, hogy az egyes részek vajon generálhatók-e valamilyen szabálllyal. Ehhez pedig a mátrix már kitöltött dobozait fogjuk használni.

Például a legbaloldalibb dobozhoz az $abb$ részszó tartozik. E szót kétféleképpen tudjuk két részre bontani:

  * $a$ és $bb$,
  * $ab$ és $b$.

Látjuk, hogy $a$-t generálhatunk $A$-val, $bb$-t azonban nem tudunk generálni, mivel a hozzátartozó dobozt kihúztuk. Ez a felbontás tehát nem lesz megfelelő. $ab$-t szintén nem tudjuk generálni, hiszen az ő doboza is ki van húzva. Ennek következtében az $abb$ részszó dobozát szintén kihúzzuk.

A szint összes többi doboza esetén ugyanígy kell eljárnunk.
`,
  md.cell`<img src="./files/08-cyk-3.svg">`,
  md.cell`
A többi szintet is hasonló elv mentén kell kitöltenünk, míg ki nem töltöttük a legfelső szint egyetlen dobozát.

Ha ez a doboz tartalmazza a nyelv mondatszimbólumát (jelen esetben ez $S$), akkor a vizsgált szó generálható az adott nyelvvel.
`,
  md.cell`<img src="./files/08-cyk-4.svg">`,
  md.cell`
Készen vagyunk, a $G$ nyelvtan által generált nyelvben benne van az $abbaab$ szó.
`,
]

const meta = {
  order: 8,
  layout: 'practice',
  urlTitle: '08-chomsky-normalforma-cyk-algoritmus',
  publishedAt: DateTime.local(2020, 11, 10, 16, 40),
  draft: false,
}

const content = {
  title: '8. gyakorlat – Chomsky normálforma, Cocke-Younger-Kasami algoritmus',
  excerpt:
    'A gyakorlat első felében grammatikákat hozunk Chomsky normálformára. Ezt követően a Cocke-Younger-Kasami algoritmust használjuk, és eldöntjük, hogy adott szó benne van-e adott grammatika által generált nyelvben. ',
  cells,
}

module.exports = {
  meta,
  content,
}
