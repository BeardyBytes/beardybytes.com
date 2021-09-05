const { DateTime } = require('luxon')
const md = require('../../../common/cells/markdown')
const { section, subsection, subsubsection } = require('../../../common/cells/heading')

const cells = [
  md.cell`
A gyakorlathoz tartozó feladatsor elérhető a következő linken:

> [09-pumpalasi-lemma-kornyezetfuggetlen-nyelvekre-veremautomatak-feladatsor.pdf](./files/09-pumpalasi-lemma-kornyezetfuggetlen-nyelvekre-veremautomatak-feladatsor.pdf)
`,
  section.cell`A környezetfüggetlen nyelvekre vonatkozó pumpálási lemma`,
  md.cell`
A gyakorlat első felében a környezetfüggetlen nyelvekre vonatkozó pumpálási lemmával foglalkozunk. A gyakorlati alkalmazás hasonló lesz a reguláris nyelvekre vonatkozó pumpálási lemmánál látotthoz: a lemmát használva fogjuk bebizonyítani nyelvekről, hogy nem környezetfüggetlenek.
`,
  subsection.cell`A pumpálási lemma`,
  md.cell`
A lemma bizonyítással együtt megtalálható a következő forrásokban:

  > [Dömösi, Falucskai, Horváth, Mecsei, Nagy: Formális Nyelvek és Automaták; 7.4.](https://gyires.inf.unideb.hu/KMITT/b24/ch07s04.html),

  > Hopcroft, Motwani, Ullman: Introduction to Automata Theory, Languages, and Computation (3rd edition); 279-285.

Ha $L$ egy környezetfüggetlen nyelv, akkor létezik olyan $n$, hogy ha $s \\in L$ és $|s| > n$, akkor $s$ felírható 

$$
s = uvxyz
$$

alakban, ahol
  * $|vxy| \\leq n$,
  * $|vy| > 0$, azaz $vy \\neq \\lambda$,
  * $uv^{i}xy^{i}z \\in L$ bármely $i \\geq 0$-ra.
`,
  subsection.cell`Példa`,
  md.cell`
Tegyük fel, hogy az $L = \\{ a^{i}b^{i}c^{i} \\;|\\; i \\geq 0 \\}$ nyelv környezetfüggetlen. Ekkor, a pumpálási lemma szerint, adott valamilyen, $L$-től függő $n$ érték.

Válasszuk meg az $s \\in L$ szót a következőképpen:

$$
s = a^{n}b^{n}c^{n}.
$$

A fenti választásunk olyan, hogy $|s| > n$.

A pumpálási lemma szerint ekkor $s$ felírható $s = uvxyz$ alakban, mely felbontásnak teljesítenie kell a következőket.

$|vxy| \\leq n$, amiből következik (tekintve, hogy $|s| = 3n$, és minden, azonos szimbólumból álló szegmens hossza $n$), hogy $vxy$-ban legfeljebb csak két különböző szimbólum lehet, az alábbi lehetőségek valamelyike szerint:

  * $a\\ldots a$,
  * $a\\ldots b$,
  * $b\\ldots b$,
  * $b\\ldots c$,
  * $c\\ldots c$.

$|vy| > 0$, amiből adódik, hogy $vy$-ban is legfeljebb csak két különböző szimbólum lehet.

A fenti két megállapításból adódik, hogy mind $vxy$-ban, mind $vy$-ban van legalább egyféle szimbólum és legfeljebb kétféle van.

A lemma végül azt mondja, hogy $uv^{i}xy^{i}z \\in L$ bármely $i \\geq 0$-ra, azaz a $v$ és $y$ részszavak pumpálásával képzett szavak is benne lesznek az $L$ nyelvben. Ha $v$-t és $y$-t lefelé pumpáljuk, akkor, tekintve, hogy legfeljebb két különböző szimbólumot tartalmaznak, ezért legfeljebb két szimbólum előfordulásának száma fog csökkenni. A nyelvet azonban olyan szavak alkotják, melyekben azonos számú $a$, $b$ és $c$ betű követi egymást. A lefelé pumpálással ez a tulajdonság azonban elromlik, a kapott szó tehát nem lesz része a nyelvnek.

Mivel a bizonyítás elején feltettük, hogy $L$ környezetfüggetlen, azonban találtunk olyan szót $L$-ben, melyre nem teljesül a pumpálási lemma, ezért ellentmondást kaptunk, azaz $L$ nem környezetfüggetlen.
`,
  subsection.cell`3. feladat`,
  subsubsection.cell`3. b)`,
  md.cell`
Tegyük fel, hogy az $L = \\{ a^{2^{i}} \\;|\\; i \\geq 0 \\}$ nyelv környezetfüggetlen. Ekkor, a pumpálási lemma szerint, adott valamilyen, $L$-től függő $n$ érték.

Válasszuk meg az $s \\in L$ szót a következőképpen:

$$
s = a^{2^{n}}.
$$

A fenti választásunk olyan, hogy $|s| > n$.

A pumpálási lemma szerint ekkor $s$ felírható $s = uvxyz$ alakban, mely felbontásnak teljesítenie kell a következőket.

$|vy| > 0$, amiből adódik, hogy $vy$ csupa $a$ betűből áll.

$|vxy| \\leq n$, amiből, kombinálva az előző megállapítással, következik, hogy $vxy$ csupa $a$ betűből áll.

A lemma végül azt mondja, hogy $uv^{i}xy^{i}z \\in L$ bármely $i \\geq 0$-ra, azaz a $v$ és $y$ részszavak pumpálásával képzett szavak is benne lesznek az $L$ nyelvben.

Jelöljük a pumpált rész, azaz $vy$ hosszát $f$-fel: $|vy| = f$. Ekkor a felfelé pumpálással képzett szavak hossza a következőképpen alakul:

  * $i = 1$, szóhossz: $|s|$,
  * $i = 2$, szóhossz: $|s| + f$,
  * $i = 3$, szóhossz: $|s| + 2f$,
  * $i = 4$, szóhossz: $|s| + 3f$,
  * Tetszőleges $i$ esetén a szóhossz: $|s| + (i - 1)f$.

Láthatjuk, hogy a pumpálással képzett szavak hossza egy számtani sorozatot alkot, melynek differenciája $f$. Az $L$ nyelvet alkotó szavak ugyanakkor kettőhatvány hosszúak. Az egymást követő kettőhatványokat azonban nem tudjuk egy számtani sorozattal képezni. Azaz, felfelé pumpálással biztosan tudunk olyan szót előállítani, mely nincs benne a nyelvben.

Mivel a bizonyítás elején feltettük, hogy $L$ környezetfüggetlen, azonban találtunk olyan szót $L$-ben, melyre nem teljesül a pumpálási lemma, ezért ellentmondást kaptunk, azaz $L$ nem környezetfüggetlen.
`,
  section.cell`Veremautomata`,
  subsection.cell`1. feladat`,
  subsubsection.cell`1. a)`,
  md.cell`
A veremautomata olyan szavakat fogad el, melyek ugyanazzal a betűvel fejeződnek be, mint amivel kezdődtek.
`,
  md.cell`<img src="files/09-1-a.svg" >`,
  subsubsection.cell`1. b)`,
  md.cell`
A veremautomata olyan szavakat fogad el, melyek $n \\geq 0$ darab $a, b$ betűvel kezdődnek, ezeket egy $c$ betű követi, majd újra $n$ darab $a, b$ betűvel végződnek. Például: $babcabb$.
`,
  md.cell`<img src="files/09-1-b.svg" >`,
  section.cell`3. feladat`,
  subsubsection.cell`3. a)`,
  md.cell`
A $q_{0}$ állapotban minden elolvasott $a$ betűhöz két darab $X$-et rakunk a veremre. Ezt követően, átlépve a $q_{1}$ állapotba, minden elolvasott $b$ betű esetén csak egy $X$-et veszünk le a verem tetejéről. Így érjük el azt, hogy csak olyan szavakat fogadjunk el, melyekben $2n$ $b$ betű követ $n$ $a$ betűt. Az üres szó elfogadását a $\\lambda, Z_{0}/Z_{0}$ állapotátmenetek biztosítják.
`,
  md.cell`<img src="files/09-3-a.svg" >`,
  section.cell`5. feladat`,
  subsubsection.cell`5. d)`,
  md.cell`
A $q_{0}$ állapotban minden elolvasott $a$ betű esetén egy darab $N$-t helyezünk a verem tetejére. Ezután a $q_{1}$ állapotban minden elolvasott $b$ betűnél leveszünk egy $N$-t a veremről, majd ha elfogytak az $N$-ek (azaz $a^{n}b^{n}$-t olvastunk eddig), akkor elkezdünk $M$-eket pakolni a verem tetejére. A $q_{2}$ állapotban aztán ezeket az $M$-eket fogyasztjuk el a veremből, $a$ betűket olvasva. Ha kiürült a verem, akkor pedig átlépünk a $q_{3}$ állapotba.
`,
  md.cell`<img src="files/09-5-d.svg" >`,
]

const meta = {
  order: 9,
  layout: 'practice',
  urlTitle: '09-pumpalasi-lemma-kornyezetfuggetlen-nyelvekre-veremautomatak',
  publishedAt: DateTime.local(2020, 11, 10, 20, 0),
  draft: true,
}

const content = {
  title: '9. gyakorlat – Pumpálási lemma környezetfüggetlen nyelvekre, veremautomaták',
  excerpt:
    'A környezetfüggetlen nyelvekre vonatkozó pumpálási lemmát alkalmazva megmutatjuk nyelvekről, hogy nem lehet őket környezetfüggetlen grammatikával generálni. A gyakorlat második felében pedig egy új típusú automatával, a veremautomatával foglalkozunk.',
  cells,
}

module.exports = {
  meta,
  content,
}
