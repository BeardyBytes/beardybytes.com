const { html } = require('common-tags');
const { DateTime } = require('luxon');
const md = require('../../../common/cells/markdown');
const { codeBlockWithNumbering, codeBlockWithoutNumbering } = require('../../../common/cells/code');
const diffBlock = require('../../../common/cells/diff');
const twoColumn = require('../../../common/cells/two-column');
const { section, subsection } = require('../../../common/cells/heading');

const cells = [
md.cell`
Sok-sok munka árán végre elkészült a layout, ami majd a refaktorálással kapcsolatos írások alapját fogja szolgáltatni. A következő szekciók ennek a küllemét mutatják be.
`,
section.cell`Szövegtörzs`,
md.cell`
**Markdown** segítségével formázott paragrafusok hatezerrel.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum lectus orci, sed iaculis est pulvinar tempus. Suspendisse potenti. Praesent gravida iaculis eleifend. 

Cras faucibus nisi a nulla vulputate, eget iaculis est vulputate. In a justo sem. Vivamus tempor hendrerit ante sed dignissim. Integer vel faucibus orci. Pellentesque tempus justo ex. Donec eu nibh sed nibh vestibulum egestas quis nec elit. Cras aliquam erat id orci porttitor congue. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum lectus orci, sed iaculis est pulvinar tempus. Suspendisse potenti. Praesent gravida iaculis eleifend. Cras faucibus nisi a nulla vulputate, eget iaculis est vulputate. In a justo sem. Vivamus tempor hendrerit ante sed dignissim. Integer vel faucibus orci. Pellentesque tempus justo ex. Donec eu nibh sed nibh vestibulum egestas quis nec elit. Cras aliquam erat id orci porttitor congue. 
`,
section.cell`Kódrészletek és hasábos megjelenítés`,
subsection.cell`Kódrészlet számozás nélkül`,
twoColumn.cell({
    options: { sticky: true },
    left: md`
A sok szöveg azért van, hogy látszódjék: a kódrészlet ragad a rajzterület tetejéhez. Kisebb kijelzőn a jobboldali hasáb a baloldali alatt kerül megjelenítésre.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum lectus orci, sed iaculis est pulvinar tempus. Suspendisse potenti. Praesent gravida iaculis eleifend. Cras faucibus nisi a nulla vulputate, eget iaculis est vulputate. In a justo sem. Vivamus tempor hendrerit ante sed dignissim. Integer vel faucibus orci. Pellentesque tempus justo ex. Donec eu nibh sed nibh vestibulum egestas quis nec elit. Cras aliquam erat id orci porttitor congue. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum lectus orci, sed iaculis est pulvinar tempus. Suspendisse potenti. Praesent gravida iaculis eleifend. Cras faucibus nisi a nulla vulputate, eget iaculis est vulputate. In a justo sem. Vivamus tempor hendrerit ante sed dignissim. Integer vel faucibus orci. Pellentesque tempus justo ex. Donec eu nibh sed nibh vestibulum egestas quis nec elit. Cras aliquam erat id orci porttitor congue. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus elementum lectus orci, sed iaculis est pulvinar tempus. Suspendisse potenti. Praesent gravida iaculis eleifend. Cras faucibus nisi a nulla vulputate, eget iaculis est vulputate. In a justo sem. Vivamus tempor hendrerit ante sed dignissim. Integer vel faucibus orci. Pellentesque tempus justo ex. Donec eu nibh sed nibh vestibulum egestas quis nec elit. Cras aliquam erat id orci porttitor congue. 
`,
    right: codeBlockWithoutNumbering('javascript')`
// One of JavaScript's most powerful features is closures. If a function is
// defined inside another function, the inner function has access to all the
// outer function's variables, even after the outer function exits.
function sayHelloInFiveSeconds(name){
    var prompt = "Hello, " + name + "!";
    // Inner functions are put in the local scope by default, as if they were
    // declared with \`var\`.
    function inner(){
        alert(prompt);
    }
    setTimeout(inner, 5000);
    // setTimeout is asynchronous, so the sayHelloInFiveSeconds function will
    // exit immediately, and setTimeout will call inner afterwards. However,
    // because inner is "closed over" sayHelloInFiveSeconds, inner still has
    // access to the \`prompt\` variable when it is finally called.
}
sayHelloInFiveSeconds(""); 
`
}),
subsection.cell`Kódrészlet számozással`,
md.cell`Természetesen lehetséges kódrészletek sorszámozása is.`,
codeBlockWithNumbering.cell('javascript')`
grade = 'B';
switch (grade) {
  case 'A':
    console.log("Great job");
    break;
  case 'B':
    console.log("OK job");
    break;
  case 'C':
    console.log("You can do better");
    break;
  default:
    console.log("Oy vey");
    break;
}`,
subsection.cell`Kódrészlet kommentekkel`,
md.cell`Óriási fícsör, hogy lehetséges kapcsolgatható kommentek elhelyezése.`,
codeBlockWithNumbering.cell('javascript')`
function printGrade(grade) {
    switch (grade) {
    case 'A':
        console.log("Great job");
        break;
    case 'B':
        console.log("OK job");
        break;
    case 'C':
        console.log("You can do better");
        break;
    default:
        console.log("Oy vey");
        break;
    }
}
${
md`
Készítettünk egy függvényt, mely kiírja, hogy mennyire voltunk frankók:

  * **A**: nagyon klassz,
  * **B**: okcsá,
  * **C**: meh.

Ezekben a kis blokkokban is tetszőleges markdown formázott cucc lehet.
`}
printGrade('A');
printGrade('B');
printGrade('C');
printGrade('lol');
${
md`
Meghívjuk különböző értékekkel a függvényt.
`
}`,
section.cell`Diff is van`,
md.cell`
Kód-diffek megjelenítésére alkalmas komponens.
`,
diffBlock.cell('cpp')`
diff --git a/main.cpp b/main.cpp
index c180659..6a07485 100644
--- a/main.cpp
+++ b/main.cpp
@@ -4,13 +4,11 @@
 #include <math.h>
 #include <vector>
 
-using namespace std;
-
 float winWidth = 800.0, winHeight = 700.0;
 GLint dragged = 1;
 vec2 startpoint, endpoint;
-vector<vec2> controllpoints = {};
-vector<vec2> points = {};
+std::vector<vec2> controllpoints = {};
+std::vector<vec2> points = {};
 
 
 mat4 M = {
@@ -78,7 +76,7 @@ void bspline() {
 };
 
 
-GLint getActivePoint1(vector<vec2> p, GLint size, GLint sens, GLint x, GLint y)
+GLint getActivePoint1(std::vector<vec2> p, GLint size, GLint sens, GLint x, GLint y)
 {
     GLint i, s = sens * sens;
`
]

const post = {
    title: 'Hello, World!',
    urlTitle: 'hello-world',
    publishedAt: DateTime.local(),
    draft: false,
    excerpt: 'A short description of the post',
    layout: 'post',

    content() {
        return cells.join('\n');
    }
};

module.exports = post;
