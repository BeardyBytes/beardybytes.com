const { html } = require('common-tags');
const { DateTime } = require('luxon');

const elements = {
    head({ title }) {
        return html`
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
    
            <title>${title}</title>
    
            <meta name="viewport" content="width=device-width, initial-scale=1">
    
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans|IBM+Plex+Serif">
    
            <link rel="stylesheet" href="/resources/css/normalize.css">
            <link rel="stylesheet" href="/resources/css/refactoring/main.css">

            <link rel="stylesheet" href="/resources/css/code/code-comment.css">
            <link rel="stylesheet" href="/resources/css/code/diff.css">
            <link rel="stylesheet" href="/resources/css/code/prism.css">
            <link rel="stylesheet" href="/resources/css/code/line-numbers.css">
            <link rel="stylesheet" href="/resources/css/refactoring/code/prism.css">
            <link rel="stylesheet" href="/resources/css/refactoring/code/diff.css">
        `;
    },
    header() {
        return html`
            <div class="top-menu"></div>
        `;
    },
    footer() {
        return html``
    }
};

const content = require('../site-content')();
const series = {
    title: 'Refactoring Series'
};
const post = {
    title: 'B-Spline Curve in C++',
    publishedAt: DateTime.local()
};

const POST_DATE_FORMAT = 'LLLL dd, y';

module.exports = function siteLayout() {
    return html`
        <!doctype html>
        <html>

        <head>
            ${elements.head({ title: 'Refactoring Site' })}
        </head>

        <body>
            <div class="site">
                <div class="panel menu-panel">
                    <div class="top-menu">
                        <div class="top-menu-entry inactive">
                            <img src="/resources/img/home-outline.svg" />
                        </div>
                        <div class="top-menu-entry inactive">
                            <img src="/resources/img/code-outline.svg" />
                        </div>
                        <div class="top-menu-entry active">
                            <img src="/resources/img/message-square-outline.svg" />
                        </div>
                    </div>
                    <div class="bottom-menu">
                        <div class="bottom-menu-entry">
                            <img src="/resources/img/arrow-ios-back-outline.svg" />
                        </div>
                        <div class="bottom-menu-entry">
                            <img src="/resources/img/arrow-ios-forward-outline.svg" />
                        </div>
                    </div>
                </div>
                <div class="panel content-panel">
                    <div class="panel side-panel">
                        <div class="page inactive home-page">
                            <div class="title">
                                <h1>${series.title}</h1>
                                <h2>${post.title}</h2>
                                <div class="post-date">Posted at ${post.publishedAt.toFormat(POST_DATE_FORMAT)}.</div>
                            </div>
                            <div class="menu">
                                <a href="#" class="menu-entry">
                                    <!--<div class="menu-entry-element">
                                        <img src="/resources/img/beardy-bytes-logo-no-text.svg" />
                                    </div>-->
                                    <div class="menu-entry-element menu-entry-text">
                                        Beardy Bytes home
                                    </div>
                                    <div class="clear"></div>
                                </a>
                                <a href="#" class="menu-entry">
                                    <!--<div class="menu-entry-element">
                                        <img src="/resources/img/home-outline.svg" />
                                    </div>-->
                                    <div class="menu-entry-element menu-entry-text">
                                        Refactoring Series home
                                    </div>
                                    <div class="clear"></div>
                                </a>
                                <a href="#" class="menu-entry">
                                    <!--<div class="menu-entry-element">
                                        <img src="/resources/img/arrow-ios-back-outline.svg" />
                                    </div>-->
                                    <div class="menu-entry-element menu-entry-text">
                                        Previous Post
                                    </div>
                                    <div class="clear"></div>
                                </a>
                                <a href="#" class="menu-entry">
                                    <!--<div class="menu-entry-element">
                                        <img src="/resources/img/arrow-ios-forward-outline.svg" />
                                    </div>-->
                                    <div class="menu-entry-element menu-entry-text">
                                        Next Post
                                    </div>
                                    <div class="clear"></div>
                                </a>
                            </div>
                            <div class="description">
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum massa leo. Proin luctus tortor a velit egestas varius. Duis porttitor est nec malesuada blandit. Quisque quis tristique est. Integer mollis metus non scelerisque ultricies. 
                                </p>
                                <p>
                                Nullam tempor malesuada magna, vitae vehicula arcu elementum id. Ut molestie nulla vitae purus elementum, non tristique elit dictum. Proin sit amet convallis neque. 
                                </p>
                                <p>
                                Quisque erat nisl, auctor sed ipsum et, pharetra suscipit est. 
                                </p>
                            </div>
                        </div>
                        <div class="page inactive commits-page">
                            <div class="page-content-wrapper">
                                <div>
                                    <h1>Commits</h1>
                                </div>
                                <p>
                                    You can step forward and backward in the refactoring process by clicking on the appropriate commit.
                                </p>
                                <p>
                                    Clicking on the hash link will take you to the GitHub page of the commit.
                                </p>
                            </div>
                            <div class="commits">
                                <div class="commit active">
                                    <a class="commit-hash" href="#">
                                        f386f3f 
                                    </a>
                                    <div class="commit-message">
                                        Fixed errors regarding code cells and highlighting.
                                    </div>
                                </div>
                                <div class="commit">
                                    <a class="commit-hash" href="#">
                                        f386f3f 
                                    </a>
                                    <div class="commit-message">
                                        Fixed errors regarding code cells and highlighting.
                                    </div>
                                </div>
                                <div class="commit">
                                    <a class="commit-hash" href="#">
                                        f386f3f 
                                    </a>
                                    <div class="commit-message">
                                        Fixed errors regarding code cells and highlighting.
                                    </div>
                                </div>
                                <div class="commit">
                                    <a class="commit-hash" href="#">
                                        f386f3f 
                                    </a>
                                    <div class="commit-message">
                                        Fixed errors regarding code cells and highlighting.
                                    </div>
                                </div>
                                <div class="commit">
                                    <a class="commit-hash" href="#">
                                        f386f3f 
                                    </a>
                                    <div class="commit-message">
                                        Fixed errors regarding code cells and highlighting.
                                    </div>
                                </div>
                                <div class="commit">
                                    <a class="commit-hash" href="#">
                                        f386f3f 
                                    </a>
                                    <div class="commit-message">
                                        Fixed errors regarding code cells and highlighting.
                                    </div>
                                </div>
                                <div class="commit">
                                    <a class="commit-hash" href="#">
                                        f386f3f 
                                    </a>
                                    <div class="commit-message">
                                        Fixed errors regarding code cells and highlighting.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="page active comments-page">
                            <div class="page-content-wrapper">
                                <div>
                                    <h1>Overview</h1>
                                </div>
                                <p>
                                    Here you find a detailed explanation of the changes made in the commit, as well as the process of identifying the next steps.
                                </p>
                            </div>
                            <div class="comments">
                                <div class="comment">
                                    <div class="comment-head">
                                        <div class="comment-title">
                                            <span class="counter">
                                                1/10
                                            </span>
                                            <span class="text">
                                                Setting the scene
                                            </span>
                                        </div>
                                        <div class="comment-location">
                                            <span class="text">
                                            Location:
                                            </span>
                                            <span data-jump-to="70" class="line-location">
                                                line 70
                                            </span>,
                                            <span data-jump-to="90" class="line-location">
                                                line 90
                                            </span>
                                        </div>
                                    </div>
                                    <div class="comment-body">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum massa leo. Proin luctus tortor a velit egestas varius. Duis porttitor est nec malesuada blandit. Quisque quis tristique est. Integer mollis metus non scelerisque ultricies. 
                                        </p>
                                    </div>
                                </div>
                                <div class="comment">
                                    <div class="comment-head">
                                        <div class="comment-title">
                                            <span class="counter">
                                                2/10
                                            </span>
                                            <span class="text">
                                                Setting the scene
                                            </span>
                                        </div>
                                        <div class="comment-location">
                                            <span class="text">
                                            Location:
                                            </span>
                                            <span data-jump-to="70" class="line-location">
                                                line 70
                                            </span>,
                                            <span data-jump-to="90" class="line-location">
                                                line 90
                                            </span>
                                        </div>
                                    </div>
                                    <div class="comment-body">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum massa leo. Proin luctus tortor a velit egestas varius. Duis porttitor est nec malesuada blandit. Quisque quis tristique est. Integer mollis metus non scelerisque ultricies. 
                                        </p>
                                    </div>
                                </div>
                                <div class="comment">
                                    <div class="comment-head">
                                        <div class="comment-title">
                                            <span class="counter">
                                                3/10
                                            </span>
                                            <span class="text">
                                                Setting the scene
                                            </span>
                                        </div>
                                        <div class="comment-location">
                                            <span class="text">
                                            Location:
                                            </span>
                                            <span data-jump-to="70" class="line-location">
                                                line 70
                                            </span>,
                                            <span data-jump-to="90" class="line-location">
                                                line 90
                                            </span>
                                        </div>
                                    </div>
                                    <div class="comment-body">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum massa leo. Proin luctus tortor a velit egestas varius. Duis porttitor est nec malesuada blandit. Quisque quis tristique est. Integer mollis metus non scelerisque ultricies. 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel code-panel">
                        <div class="page active code-page">
                            ${content.code}
                        </div>
                        <div class="page inactive diff-page">
                            ${content.diff}
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
            </div>
            <script type="text/javascript" src="/resources/script/site.js"></script>
        </body>

        </html>
    `;
};
