const { html } = require('common-tags');

const elements = {
    head({ title }) {
        return html`
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
    
            <title>${title}</title>
    
            <meta name="viewport" content="width=device-width, initial-scale=1">
    
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans|IBM+Plex+Serif"> 
    
            <link rel="stylesheet" href="/resources/css/main.css">
            <link rel="stylesheet" href="/resources/css/code/code-comment.css">
            <link rel="stylesheet" href="/resources/css/code/diff.css">
            <link rel="stylesheet" href="/resources/css/code/line-numbers.css">
            <link rel="stylesheet" href="/resources/css/code/prism.css">
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

module.exports = function postLayout(post, series, configuration) {
    return html`
        <!doctype html>
        <html>

        <head>
            ${elements.head({ title: post.title })}
        </head>

        <body>
            <div class="site">
                ${elements.header()}
                <div class="post-content">
                    <!-- Insert title and date -->
                    
                    ${post.content}

                    <!-- Insert previous and next -->
                </div>
                ${elements.footer()}
            </div>

            ${post.scripts}
            <script type="text/javascript" src="/resources/script/refactoring-posts.js"></script>
        </body>

        </html>
    `;
};
