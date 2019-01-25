const { html } = require('common-tags');

const content = html`
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Beardy Bytes - Attila Bagossy Software Engineer</title>
    <!--
    TODO:
        Description from global context.
    -->
    <meta name="description" content"">

    <!--
    TODO:
        Canonical link from global context.
    -->
    <link rel="canonical" href="" />

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=IBM+Plex+Serif"> 

    <link rel="stylesheet" href="/resources/css/normalize.css">

    <!--
    TODO:
        Inline minified critical parts.
        https://developers.google.com/web/updates/2016/02/font-display
    -->
    <link rel="stylesheet" href="/resources/css/landing.css">
</head>
<body>
    <div class="barber-bar stripes">
    </div>
    <main>
        <div class="top-padding-block">
        </div>
        <div class="logo-block flex-center">
            <!--
            TODO:
                Inline optimized SVG.
            -->
            <img class="logo" src="/resources/img/beardy-bytes-logo.svg">
        </div>
        <div class="welcome-text-block flex-center">
            <div class="welcome-text">
                <h1>
                    Hi! I'm Attila Bagossy
                </h1>
                <!--
                TODO:
                    Script to change text.
                -->
                <h1 class="stuff-i-do">
                    and I write code.
                </h1>
            </div>
        </div>
        <div class="nav-block">
            <nav class="flex-center">
                <div>
                    <a href="#">About Me</a>
                    <a href="#">Blog</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">GitHub</a>
                </div>
            </nav>
        </div>
    </main>
    <div class="barber-bar stripes">
    </div>
    <div class="clear">
    </div>
</body>
</html>
`

const url = 'index.html'

module.exports = function landing({ baseUrl }) {
    return {
        emit: [{
            content,
            url: `${baseUrl}/${url}`
        }],
        copy: []
    };
};
