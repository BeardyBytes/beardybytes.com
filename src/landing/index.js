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
    <link rel="stylesheet" href="/resources/css/landing.css">
</head>
<body>
    <h1>Hi!</h1>
</bod>
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
