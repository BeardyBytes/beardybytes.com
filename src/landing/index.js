const { html } = require('common-tags');

const content = html`
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <title>Beardy Bytes</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=IBM+Plex+Serif"> 

    <link rel="stylesheet" href="/resources/css/normalize.css">
    <link rel="stylesheet" href="/resources/css/landing.css">
</head>
<body>
    <div class="cover">
        <div class="top-padding-block">
        </div>
        <div class="logo-block flex-center">
            <img class="logo" src="/resources/img/beardy-bytes-logo.svg">
        </div>
        <div class="welcome-text-block flex-center">
            <div class="welcome-text">
                <div>
                    Hi! I'm Attila Bagossy
                </div>
                <div class="stuff-i-do">
                    and I write code.
                </div>
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
            <div class="bottom-decoration stripes">
            </div>
        </div>
    </div>
</body>
</html>
`

const url = 'index.html'

module.exports = function landing(baseUrl) {
    return {
        emit: [{
            content,
            url: `${baseUrl}/${url}`
        }],
        copy: []
    };
};
