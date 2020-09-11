const { codeBlockWithNumbering } = require('../../common/cells/code')
const diffBlock = require('../../common/cells/diff')

module.exports = function content() {
  const code = codeBlockWithNumbering('cpp')`
    //
    //  main.cpp
    //  hf-01-b-spline-prike
    //  https://github.com/computer-graphics-18-19-1/hf-01-b-spline-prike
    //
    //  Created by Prike on 2018. 10. 12..
    //  Copyright © 2018. Prike. All rights reserved.
    //
    #ifdef __APPLE__
    #include <GLUT/glut.h>
    #else
    #include <GL/glut.h>
    #endif
    #include <math.h>
    #include "bevgrafmath2017.h"
    #include <vector>
    #include <iostream>
    
    GLsizei winWidth = 800, winHeight = 600;
    GLsizei controlPointSize = 15;
    GLsizei jointPointSize = 10;
    
    std::vector<vec2> points = { {400, 300} };
    
    mat4 matrixM(
        vec4(-1,3,-3,1) * 1/6,
        vec4(3,-6,0,4) * 1/6,
        vec4(-3,3,3,1) * 1/6,
        vec4(1,0,0,0) * 1/6
    );
    
    GLint dragged = -1;
    
    double r, g, b = 0.0;
    
    void init() {
        glClearColor(1.0, 1.0, 1.0, 0.0);
        glMatrixMode(GL_PROJECTION);
        gluOrtho2D(0.0, winWidth, 0.0, winHeight);
        //glShadeModel(GL_FLAT);
        glEnable(GL_POINT_SMOOTH);
        //glEnable(GL_LINE_SMOOTH);
        glLineWidth(1.0);
    }
    
    void drawPoints(){
        glColor3f(0.3, 0.3, 0.3);
        glPointSize(controlPointSize);
        glBegin(GL_POINTS);
        for (auto const& point: points) {
            glVertex2i(point.x, point.y);
        }
        glEnd();
    }
    
    void drawPolygon(){
        glColor3f(0.8, 0.8, 0.8);
        glBegin(GL_LINE_STRIP);
        for (auto const& point: points) {
            glVertex2i(point.x, point.y);
        }
        glEnd();
    }
    
    void drawBSpline(){
        vec2 point_minus1 = (2 * points[0]) - points[1];
        vec2 point_nplus1 = (2 * points[points.size()-1]) - points[points.size()-2];
        
        points.insert(points.begin(), point_minus1); // deque if neccessary
        points.push_back(point_nplus1);
        
        for (int i = 0; i < points.size()-3; ++i) {
            mat4 matrixG (
              vec4(points[i][0], points[i][1]),
              vec4(points[i+1][0], points[i+1][1]),
              vec4(points[i+2][0], points[i+2][1]),
              vec4(points[i+3][0], points[i+3][1]),
              true
              );
            mat4 matrixC =  matrixG * matrixM;
            vec4 asd = 0;
            glColor3f(0.0, 0.0, 0.0);
            glBegin(GL_LINE_STRIP);
            for (float t = 0.0; t <= 1.05; t+=0.05) {
                vec4 T(t * t * t, t * t, t, 1);
                 asd = matrixC * T;
                glVertex2i(asd[0], asd[1]);
            }
            glEnd();
            glColor3f(0.0, 0.0, 1.0);
            glPointSize(jointPointSize);
            glBegin(GL_POINTS);
                glVertex2i(asd.x, asd.y);
            glEnd();
        }
        
        points.erase(points.begin());
        points.pop_back();
    
    }
    
    void display() {
        
        glClear(GL_COLOR_BUFFER_BIT);
        
        drawPolygon();
        if(points.size() > 3){
            drawBSpline();
        }
        drawPoints();
        
        glutSwapBuffers();
    }
    
    GLint getActivePoint(std::vector<vec2> p, GLint sens, GLint x, GLint y) {
        GLint s = sens * sens;
        vec2 P = { (float)x, (float)y };
        
        for (int i = 0; i < p.size(); i++)
            if (dist2(p[i], P) < s)
                return i;
        return -1;
    }
    
    void processMouse(GLint button, GLint action, GLint xMouse, GLint yMouse) {
        GLint i;
        if (button == GLUT_LEFT_BUTTON && action == GLUT_DOWN){
            if ((i = getActivePoint(points, controlPointSize/2, xMouse, winHeight - yMouse)) != -1)
            {
                dragged = i;
            }
            else
            {
                points.push_back(vec2(xMouse,winHeight - yMouse));
            }
        }
        
        if (button == GLUT_LEFT_BUTTON && action == GLUT_UP)
            dragged = -1;
        
        if (button == GLUT_RIGHT_BUTTON && action == GLUT_DOWN){
            if ((i = getActivePoint(points, controlPointSize/2, xMouse, winHeight - yMouse)) != -1)
            {
                points.erase(points.begin() + i);
            }
        }
        glutPostRedisplay();
    }
    
    void processMouseActiveMotion(GLint xMouse, GLint yMouse) {
        if (dragged >= 0) {
            points[dragged].x = xMouse;
            points[dragged].y = winHeight - yMouse;
            glutPostRedisplay();
        }
    }
    
    void keyboard(unsigned char key, int x, int y) {
        switch (key) {
            case 'q':
                exit(0);
                break;
        }
        glutPostRedisplay();
    }
    
    int main(int argc, char** argv) {
        glutInit(&argc, argv);
        glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGB);
        glutInitWindowSize(winWidth, winHeight);
        glutInitWindowPosition(100, 100);
        glutCreateWindow("hf-01-b-spline-prike");
        init();
        glutDisplayFunc(display);
        glutKeyboardFunc(keyboard);
        glutMouseFunc(processMouse);
        glutMotionFunc(processMouseActiveMotion);
        glutMainLoop();
        return 0;
    }    
    `
  const diff = diffBlock('cpp')`
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
  return {
    code,
    diff,
  }
}
