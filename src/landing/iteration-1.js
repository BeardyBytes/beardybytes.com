const { html } = require('common-tags');

const content = html`
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <title>Beardy Bytes</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans|IBM+Plex+Serif"> 

    <link rel="stylesheet" href="/resources/css/normalize.css">
    <link rel="stylesheet" href="/resources/css/landing-iteration-1.css">
</head>
<body>
    <div class="cover">
        <div class="logo-wrapper flex-center">
            <img class="logo" src="/resources/img/beardy-bytes-logo.svg">
        </div>
        <div class="flex-center">
            <div class="welcome-text">
                <p>
                Hi! I'm Attila Bagossy and I write code. This is just some sample text.
                </p>
            </div>
        </div>
        <nav class="flex-center">
            <div>
                <span>About Me</span>
                <span>Blog</span>
                <span>Series</span>
                <span>GitHub</span>
            </div>
        </nav>
        <div class="bottom-decoration stripes">
        </div>
    </div>
</body>
</html>
`

const url = 'iteration-1.html'

module.exports = function landing(baseUrl) {
    return {
        emit: [{
            content,
            url: `${baseUrl}/${url}`
        }],
        copy: []
    };
};
