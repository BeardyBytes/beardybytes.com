const { html } = require('common-tags');
const md = require('../../../common/cells/markdown');
const { codeBlockWithNumbering, codeBlockWithoutNumbering } = require('../../../common/cells/code');
const diffBlock = require('../../../common/cells/diff');

const post = {
    title: 'Hello, World!',
    urlTitle: 'hello-world',
    publishedAt: new Date(2018, 12, 25),
    draft: false,
    excerpt: 'A short description of the post',
    layout: 'post',

    content() {
        const cells = [
            md.cell`# Hello, World!`,
            md.cell`A paragraph of **markdown**.`,
diffBlock.cell('c')`
diff --git a/main.cpp b/main.cpp
index c180659..6a07485 100644
--- a/main.cpp
+++ b/main.cpp
@@ -4,13 +4,11 @@
 #include math.h
 #include vector
 
-using namespace std;
-
 float winWidth = 800.0, winHeight = 700.0;
 GLint dragged = 1;
 vec2 startpoint, endpoint;
-vectorvec2 controllpoints = {};
-vectorvec2 points = {};
+std::vectorec2 controllpoints = {};
+std::vectorvec2 points = {};
 
 
 mat4 M = {
@@ -78,7 +76,7 @@ void bspline() {
 };
 
 
-GLint getActivePoint1(vector<vec2> p, GLint size, GLint sens, GLint x, GLint y)
+GLint getActivePoint1(std::vector<vec2> p, GLint size, GLint sens, GLint x, GLint y)
 {
     GLint i, s = sens * sens;
`
        ];

        return cells.join('\n');
    }
};

module.exports = post;
