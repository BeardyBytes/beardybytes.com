const { DateTime } = require('luxon')
const kroki = require('../../../common/cells/kroki')
const md = require('../../../common/cells/markdown')
const { section, subsection, subsubsection } = require('../../../common/cells/heading')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [05-regularis-kifejezesbol-automata-es-vissza-feladatsor.pdf](./files/05-regularis-kifejezesbol-automata-es-vissza-feladatsor.pdf)
`,
  section.cell`Reguláris kifejezésből véges automata`,
  subsection.cell`Építőelemek`,
  md.cell`
Adott reguláris kifejezéshez véges automatát készíteni rendkívül egyszerű: csupán néhány építőelemet kell megtanulnunk, ezek összepakolásával ugyanis bármilyen kifejezéshez tudunk automatát készíteni.
`,
  subsubsection.cell`Egyetlen betű`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; 2;
  node [shape = circle];

  S -> 1;
  1 -> 2 [ label = "a" ];
}
`,
  subsubsection.cell`Konkatenáció`,
  md.cell`
Ha olyan automatát szeretnénk készíteni, mely az $L = L_{1} \\cdot  L_{2}$ nyelvet fogadja el, akkor kövessük az alábbi lépéseket:
  1. Először állítsunk össze egy olyan automatát, mely az $L_{1}$ nyelvet fogadja el (ez legyen $N$), majd egy olyat, mely az $L_{2}$-t (ez legyen $M$).
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S1 S2;
  node [shape = doublecircle; color = black]; 2 3 4 6 7 8;
  node [shape = circle];

  subgraph cluster_n {
    rank="same";
    label=N

    S1 -> 1;
    1 -> 2 [ style=dashed ];
    1 -> 3 [ style=dashed ];
    1 -> 4 [ style=dashed ];
    graph[style=dotted];
  }
  
  subgraph cluster_m {
    rank="same";
    label=M

    S2 -> 5;
    5 -> 6 [ style=dashed ];
    5 -> 7 [ style=dashed ];
    5 -> 8 [ style=dashed ];
    graph[style=dotted];
  }

  edge[ style = invis; minlen=3; ];
  { 2 3 4 } -> S2;
}
`,
  md.cell`
  2. Ezt követően üres szó átmenettel kössük össze az $L_{1}$-et elfogadó automata összes elfogadó állapotát az $L_{2}$-t elfogadó automata kezdőállapotával.
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S1;
  node [shape = doublecircle; color = black]; 2 3 4 6 7 8;
  node [shape = circle];

  subgraph cluster_n {
    rank="same";
    label=N

    S1 -> 1;
    1 -> 2 [ style=dashed ];
    1 -> 3 [ style=dashed ];
    1 -> 4 [ style=dashed ];
    graph[style=dotted];
  }
  
  subgraph cluster_m {
    rank="same";
    label=M

    5 -> 6 [ style=dashed ];
    5 -> 7 [ style=dashed ];
    5 -> 8 [ style=dashed ];
    graph[style=dotted];
  }

  { 2 3 4 } -> 5 [label=λ;minlen=3;];
}
`,
  md.cell`
  3. Az új automata elfogadó állapotai az $L_{2}$-t elfogadó automata elfogadó állapotai lesznek.
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  size="8,5"
  node [shape = point; color = white ]; S1;
  node [shape = doublecircle; color = black]; 6 7 8;
  node [shape = circle];

  subgraph cluster_n {
    rank="same";

    S1 -> 1;
    1 -> 2 [ style=dashed ];
    1 -> 3 [ style=dashed ];
    1 -> 4 [ style=dashed ];
    graph[style=invis];
  }
  
  subgraph cluster_m {
    rank="same";

    5 -> 6 [ style=dashed ];
    5 -> 7 [ style=dashed ];
    5 -> 8 [ style=dashed ];
    graph[style=invis];
  }

  { 2 3 4 } -> 5 [label=λ;minlen=3;];
}
`,
  subsubsection.cell`Unió`,
  md.cell` 
Ha olyan automatát szeretnénk készíteni, mely az $L = L_{1} \\cup  L_{2}$ nyelvet fogadja el, akkor kövessük az alábbi lépéseket:

  1. Először állítsunk össze egy olyan automatát, mely az $L_{1}$ nyelvet fogadja el (ez legyen $N$), majd egy olyat, mely az $L_{2}$-t (ez legyen $M$).
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir="TB";
  node [shape = point; color = white ]; S1 S2;
  node [shape = doublecircle; color = black]; 2 3 4 6 7 8;
  node [shape = circle];

  subgraph cluster_n {
    rank="same"
    label=N

    S1 -> 1;
    1 -> 2 [ style=dashed ];
    1 -> 3 [ style=dashed ];
    1 -> 4 [ style=dashed ];
    graph[style=dotted];
  }
  
  subgraph cluster_m {
    rank="same"
    label=M

    S2 -> 5;
    5 -> 6 [ style=dashed ];
    5 -> 7 [ style=dashed ];
    5 -> 8 [ style=dashed ];
    graph[style=dotted];
  }

  1 -> 5 [style=invis; constraint=false; minlen=12];
}
`,
  md.cell`
  2. Adjunk hozzá egy új kezdőállapotot, majd kössük össze egy üres szó átmenettel ezt az állapotot $M$ és $N$ kezdőállapotával.
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir="TB";
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; 2 3 4 6 7 8;
  node [shape = circle];

  S -> 0
  0 -> 1 [label=λ;];
  0 -> 5 [label=λ;];

  subgraph cluster_n {
    rank="same"
    label=N

    1 -> 2 [ style=dashed ];
    1 -> 3 [ style=dashed ];
    1 -> 4 [ style=dashed ];
    graph[style=dotted];
  }
  
  subgraph cluster_m {
    rank="same"
    label=M

    5 -> 6 [ style=dashed ];
    5 -> 7 [ style=dashed ];
    5 -> 8 [ style=dashed ];
    graph[style=dotted];
  }

  1 -> 5 [style=invis; constraint=false; minlen=6];
}
`,
  md.cell`
  3. Az új automata elfogadó állapotai az $N$ és az $M$ automaták eredeti elfogadó állapotai lesznek.
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir="TB";
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; 2 3 4 6 7 8;
  node [shape = circle];

  S -> 0
  0 -> 1 [label=λ;];
  0 -> 5 [label=λ;];

  subgraph cluster_n {
    rank="same"

    1 -> 2 [ style=dashed ];
    1 -> 3 [ style=dashed ];
    1 -> 4 [ style=dashed ];
    graph[style=invis];
  }
  
  subgraph cluster_m {
    rank="same"

    5 -> 6 [ style=dashed ];
    5 -> 7 [ style=dashed ];
    5 -> 8 [ style=dashed ];
    graph[style=invis];
  }

  1 -> 5 [style=invis; constraint=false; minlen=6];
}
`,
  subsubsection.cell`Konkatenáció lezárása`,
  md.cell`
Ha olyan automatát szeretnénk készíteni, mely az $L = L_{1}^{*}$ nyelvet fogadja el, akkor kövessük az alábbi lépéseket:

  1. Először állítsunk össze egy olyan automatát, mely az $L_{1}$ nyelvet fogadja el (ez legyen $N$).
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; 2 3 4;
  node [shape = circle];

  subgraph cluster_n {
    rank="same";
    label=N;

    S -> 1;
    1 -> 2 [ style=dashed ];
    1 -> 3 [ style=dashed ];
    1 -> 4 [ style=dashed ];
    graph[style=dotted];
  }
}`,
  md.cell`
  2. Illesszünk egy új kezdőállapotot az automatába, melyet üres szó átmenettel kössünk össze az eredeti kezdőállapottal.
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; 2 3 4;
  node [shape = circle];

  subgraph cluster_n {
    rank="same";
    label=N;

    1 -> 2 [ style=dashed ];
    1 -> 3 [ style=dashed ];
    1 -> 4 [ style=dashed ];
    graph[style=dotted];
  }

  S -> 0;
  0 -> 1 [label=λ;minlen=2];
}`,
  md.cell`
  3. Az eredeti automata ($N$) minden elfogadó állapotát kössük össze üres szó átmenettel az eredeti kezdőállapottal.
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; 2 3 4;
  node [shape = circle];

  subgraph cluster_n {

    label=N;

    1 -> 2 [ style=dashed;minlen=3];
    1 -> 3 [ style=dashed;minlen=3];
    1 -> 4 [ style=dashed;minlen=3];

    {2, 3, 4} -> 1 [label=λ;constraint=false];

    graph[style=dotted];
  }

  S -> 0;
  0 -> 1 [label=λ;minlen=2];
}`,
  md.cell`
Az új automata elfogadó állapotai a következők lesznek:
  * az újonnan beillesztett kezdő állapot,
  * az eredeti automata ($N$) kezdő állapotai.
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black]; 0 2 3 4;
  node [shape = circle];

  subgraph cluster_n {
    1 -> 2 [ style=dashed;minlen=3];
    1 -> 3 [ style=dashed;minlen=3];
    1 -> 4 [ style=dashed;minlen=3];

    {2, 3, 4} -> 1 [label=λ;constraint=false];

    graph[style=invis];
  }

  S -> 0;
  0 -> 1 [label=λ;minlen=2];
}`,
  subsection.cell`2. feladat`,
  subsubsection.cell`2. a)`,
  md.cell`
A reguláris kifejezés a következő:

$$
(b + bba)^{*}a
$$

A következőkben lépésről lépésre végigvezetjük a feladat megoldását, azaz, ahogy a fent felsorolt építőelemekből összeáll a reguláris kifejezés által leírt nyelvet elfogadó automata. 
`,
  md.cell`
Kezdjük a zárójel belsejében levő kifejezéssel:

$$
b + bba.
$$

Ez egy unió, melyet felbonthatunk két kifejezésre:

  * $b$,
  * $bba$.

Azaz, készítenünk kell egy olyan automatát, mely a $b$ reguláris kifejezést fogadja el, majd egy olyat, mely a $bba$ reguláris kifejezést.
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S1 S2;
  node [shape = doublecircle; color = black ;label=""]; 2 6;
  node [shape = circle];

  subgraph cluster_n {
    S1 -> 1
    1 -> 2 [label=b];

    graph[style=invis];
  }

  subgraph cluster_m {
    S2 -> 3
    3 -> 4 [label=b];
    4 -> 5 [label=b];
    5 -> 6 [label=a];

    graph[style=invis];
  }
}`,
  md.cell`
Folytassuk az unióval, azaz a
$$
b + bba
$$
reguláris kifejezéssel.
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black ;label=""]; 2 6;
  node [shape = circle];

  0 [
    color=red
  ];

  S -> 0 [color=red];
  0 -> 1 [label=λ;color=red];
  0 -> 3 [label=λ;color=red];

  subgraph cluster_n {
    1 -> 2 [label=b];

    graph[style=invis];
  }

  subgraph cluster_m {
    3 -> 4 [label=b];
    4 -> 5 [label=b];
    5 -> 6 [label=a];

    graph[style=invis];
  }
}`,
  md.cell`
Ezután alkalmazzuk a konkatenáció lezárását, azaz a
$$
  (b + bba)^{*}
$$
kifejezést elfogadó automatát hozzuk létre.
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black ;label=""]; K 6 2;
  node [shape = circle]

  K [ color = red ];
  A [ color = white];
    S -> K[color=red];
    K -> 0 [label=λ;color=red];

    0 -> 1 [label=λ];
    0 -> 3 [label=λ];


      1 -> 2 [label=b];


      3 -> 4 [label=b];
      4 -> 5 [label=b];
      5 -> 6 [label=a];


    6 -> 0 [label=λ;color=red];
    2 -> 0 [label=λ;color=red];

  {2, 6, K} -> A [style=invis]
}`,
  md.cell`
Az utolsó lépés a kifejezés végén megjelenő konkatenáció belefoglalása az automatánkba:

$$
(b + bba)^{*}a
$$
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black ;label=""]; F;
  node [shape = circle]
    
    A [ color = red ];
    F [ color = red ];
    S -> K;
    K -> 0 [label=λ;];

    0 -> 1 [label=λ];
    0 -> 3 [label=λ];


      1 -> 2 [label=b];


      3 -> 4 [label=b];
      4 -> 5 [label=b];
      5 -> 6 [label=a];


    6 -> 0 [label=λ;];
    2 -> 0 [label=λ;];

  {2, 6, K} -> A [label=λ;color=red];
  A -> F [label=a;color=red];
}`,
  md.cell`
És ezzel készen is vagyunk! A legfontosabbak, melyekre figyeljünk oda, amikor ilyen típusú feladatokat oldunk meg:
  * Egyszerre lehetőleg csak egy lépést hajtsunk végre! Azaz alkalmazzuk a lassaj járj, tovább érsz elvet.
  * Ne próbáljunk meg egyszerűsíteni! Ragaszkodjunk az építőkockákhoz, és az általuk diktált átmenetekhez.
  * Minden lépésben szenteljünk kiemelt figyelmet az elfogadó állapotoknak. Ahogy fentebb is láthattuk, ezeken keresztül kötjük össze az egyes építőelemeket, tehát különösen fontos, hogy tudjuk, mely állapotok az aktuális elfogadó állapotok, és melyek válnak elfogadó állapottá (vagy lesznek elutasító állapotok) a következő lépésben.
  * Végezzünk önellenőrzést! Azaz, néhány példán keresztül vizsgáljuk meg, hogy a reguláris kifejezés által leírt, valamint az automata által elfogadott nyelv valóban azonos.
`,
  subsubsection.cell`2. b)`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black label=""]; 19 21 23;
  node [shape = circle];

  S -> 6;
  6 -> 5 [label=λ]
  5 -> 1 [label=λ]
  5 -> 3 [label=λ]
  1 -> 2 [ label = "a" ];
  3 -> 4 [ label = "b" ];
  {2, 4} -> 5 [label=λ]

  7 -> 8 [label=a]
  8 -> 9 [label=b]
  9 -> 10 [label=b]

  {2, 4, 6} -> 17 [label=λ]

  17 -> 7 [label=λ]
  17 -> 11 [label=λ]

  11 -> 12 [label=a]
  12 -> 13 [label=b]
  13 -> 14 [label=a]
  14 -> 15 [label=b]
  15 -> 16 [label=a]

  {10,16} -> 23 [label=λ]
  23 -> 22 [label=λ]
  22 -> 18 [label=λ]
  22 -> 20 [label=λ]
  18 -> 19 [ label = "a" ];
  20 -> 21 [ label = "b" ];
  {19, 21} -> 22 [label=λ]
}
`,
  subsubsection.cell`2. c)`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black label=""]; 7 8 13 12;
  node [shape = circle];

  S -> 0;
  1 -> 2 [label=a]
  3 -> 4 [label=b]
  0 -> {1, 3} [label=λ]

  5 -> 6 [label=a]
  6 -> 7 [label=b]
  8 -> 5 [label=λ]
  7 -> 5 [label=λ]
  {2, 4} -> 8 [label=λ]

  13 -> 9 [label=λ]
  9 -> 10 [label=a]
  10 -> 11 [label=b]
  11 -> 12 [label=b]
  12 -> 9 [label=λ]
  {8, 7} -> 13 [label=λ]
}
`,
  subsubsection.cell`2. d)`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black label=""]; 6 7 14;
  node [shape = circle];

  S -> 21;

  1 -> 2 [label=a]
  2 -> 3 [label=b]
  3 -> 4 [label=b]
  5 -> 6 [label=a]
  7 -> 5 [label=λ]
  6 -> 5 [label=λ]
  4 -> 7 [label=λ]

  8 -> 9 [label=a]
  9 -> 10 [label=b]
  11 -> 8 [label=λ]
  10 -> 8 [label=λ]

  12 -> 13 [label=b]
  13 -> 14 [label=a]
  {10, 11} -> 12 [label=λ]

  15 -> {1, 11} [label=λ]

  16 -> 17 [label=a]
  18 -> 19 [label=b]
  20 -> {16, 18} [label=λ]
  21 -> 20 [label=λ]
  {17, 19} -> 20 [label=λ]
  {17, 19, 21} -> 15 [label=λ]
}
`,
  subsubsection.cell`2. e)`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  node [shape = doublecircle; color = black label=""]; 5 6 13 14;
  node [shape = circle];

  S -> 15;

  15 -> {6, 7} [label=λ]
  6 -> 0 [label=λ]
  1 -> 2 [label=a]
  0 -> 1 [label=λ]
  2 -> 0 [label=λ]
  //7 -> 5 [label=λ]
  {0, 2} -> 3 [label=λ]
  3 -> 4 [label=b]
  4 -> 5 [label=b]
  5 -> 6 [label=λ]

  7 -> 8 [label=b]
  9 -> 10 [label=b]
  11 -> 9 [label=λ]
  10 -> 9 [label=λ]
  8 -> 11 [label=λ]

  12 -> 13 [label=a]
  14 -> 12 [label=λ]
  13 -> 12 [label=λ]
  {11, 10} -> 14 [label=λ]
}
`,
  section.cell`Véges automatából reguláris kifejezés`,
  md.cell`
Nézzük most meg a visszafelé irányt is, azaz, készítsünk adott véges automatához olyan reguláris kifejezést, mely ugyanazt a nyelvet írja le, melyet az automata elfogad. Erre a feladatra is lesz egy algoritmusunk, továbbá sok esetben az ilyen feladatok megoldhatók „ránézésre” is.
`,
  subsection.cell`Algoritmus`,
  md.cell`
Mielőtt rátérnénk az algoritmusra, meg kell változtatnunk az eddig alkalmazott véges automata fogalmunkat. A továbbiakban ugyanis meg fogjuk engedni azt is, hogy az automata állapotdiagramjában szereplő élekre tetszőleges reguláris kifejezés legyen írva. Azaz, nemcsak $a$, $\\lambda$, $a, b$ feliratokat (és ezzel átmeneteket) fogunk megengedni, hanem például olyat is, mint az $abb + b^{*}a$.

Az algoritmus alapötlete ezután a következő: Egyesével töröljük az automata állapotdiagramjából a csúcsokat, megfelelő élekkel pótolva azokat. Ha már csak két csúcs maradt, akkor készen vagyunk; az ezeket összekötő egyetlen élre írt reguláris kifejezés lesz az eredeti automatának megfelelő reguláris kifejezés.

A lépéssor egészen pontosan az alábbi:

  0. Legyen adott egy (nemdeterminisztikus) véges automata, $N=\\{Q, \\Sigma, \\delta, q_{0}, A\\}$. Olyan reguláris kifejezést keresünk, mely az automata által elfogadott $L(N)$ nyelvet írja le.
  1. Adjunk hozzá az automatához egy új kezdő állapotot! Ezt az állapotot kössük össze egy üres szó átmenettel az eredeti kezdő állapottal, $q_{0}$-val.
  2. Adjunk hozzá az automatához egy új elfogadó állapotot! $N$ minden elfogadó állapotából ($A$ elemeiből) vezessünk egy üres szó átmenetet ebbe az új állapotba. Továbbá, $A$ elemei nem lesznek többé elfogadó állapotok.
  3. Az összes $a, b$ típusú él-feliratot írjuk át reguláris kifejezésre: $a + b$.
  4. Töröljük egyesével az eredeti automata állapotait. Ha már csak az új kezdő és elfogadó állapot maradt, akkor készen vagyunk: az ezeket összekötő élre írt reguláris kifejezés a megoldás.
`,
  md.cell`
Természetesen korántsem mindegy, hogy az ötödik lépésben hogyan töröljük az egyes állapotokat. Erre az alábbi sémát használhatjuk.

Tegyük fel, hogy a $RIP$ állapotot szeretnénk törölni a következő automatából:
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  //node [shape = doublecircle; color = black]; B;
  node [shape = circle color=black];

  S -> A;

  A -> B [label=R₄]
  A -> RIP [label=R₁]
  RIP -> RIP [label=R₂]
  RIP -> B [label=R₃]
}
`,
  md.cell`
Fontos, hogy a törlés során ne állapotokban, hanem útvonalakban gondolkodjunk. Tehát vizsgáljuk meg, hogy a $RIP$ állapot milyen útvonalakban vesz részt, és ezeket hogyan lehetne helyettesíteni, ha $RIP$ kiesik.

Láthatjuk, hogy $A$-ból el tudunk jutni $B$-be $RIP$-en keresztül. Mit kell azonban olvasnunk, ha ezt az útvonalat választjuk? Előbb az $R_{1}$ kifejezést, hogy $A$-ból $RIP$-be jussunk. Ezt követően tetszőleges sok $R_{2}$-t olvashatunk, majd $R_{3}$-at olvasva $B$-be érünk.

Írjuk most ezt az útvonalat egy reguláris kifejezésbe! A tetszőleges sok $R_{2}$ az $(R_{2})^{*}$ kifejezésnek felel meg. Ha ezt megelőzően $R_{1}$-et kell olvasnunk, akkor egy konkatenációra van szükségünk: $(R_{1})(R_{2})^{*}$. Végül, ha $R_{3}$-mal kell zárnunk az olvasást, akkor újabb konkatenációra van szükségünk: $(R_{1})(R_{2})^{*}(R_{3})$.

Azaz, $RIP$ törlésével be kell iktatnunk egy új élt:
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  //node [shape = doublecircle; color = black]; B;
  node [shape = circle color=black];

  S -> A;

  A -> B [label=R₄;]
  A -> B [label="(R₁)(R₂)*(R₃)";minlen=2]
}
`,
  md.cell`
$A$-ból $B$ eljuthatunk $R_{4}$-et vagy $(R_{1})(R_{2})^{*}(R_{3})$-at olvasva. Vegyük észre a a kifejezések közötti „vagy” szót! Ez pontosan azt jelenti, hogy választhatunk az élek között, ami, lefordítva a reguláris kifejezések nyelvére, nem más, mint az unió művelet. A két élt tehát helyettesíthetjük egyetlen éllel, mely az eredeti élekre felírt kifejezések uniójával van megcímezve:
`,
  kroki.cell('graphviz', 'svg')`
digraph dfa_3b {
  rankdir=LR;
  node [shape = point; color = white ]; S;
  //node [shape = doublecircle; color = black]; B;
  node [shape = circle color=black];

  S -> A;

  A -> B [label="(R₄) ∪ (R₁)(R₂)*(R₃)";minlen=2]
}
`,
  subsection.cell`3. feladat`,
  md.cell`
> a) $a(ab+baa)^{*}(aba)^{*}(ab + bab)a$

> b) $(ab^{*}a + baaba)^{*}$

> c) $((a^{*}b + ab^{*})ab)^{+}$ vagy $(a^{*}b + ab^{*})ab((a^{*}b + ab^{*})ab)^{*}$
`,
]

const meta = {
  order: 5,
  layout: 'practice',
  urlTitle: '05-regularis-kifejezesbol-automata-es-vissza',
  publishedAt: DateTime.local(2020, 10, 7, 9, 43),
  draft: false,
}

const content = {
  title: '5. gyakorlat – Reguláris kifejezésből automata és vissza',
  excerpt:
    'Reguláris kifejezésből készítünk véges automatát, majd megnézzük a másik irányt is, véges automatához írunk fel reguláris kifejezést.',
  cells,
}

module.exports = {
  meta,
  content,
}
