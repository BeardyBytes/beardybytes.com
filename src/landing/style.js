const style = require('../common/style')

const code = () => `
html {
    line-height: 1.5;
    background-color: #ffffff;
    color: #0a0908;
}

body {
    font-family: 'IBM Plex Serif', 'Times New Roman', Times, serif;
    width: 100%;
    height: 100vh;
    margin: 0;
}

.flex-center {
    display: flex;
    justify-content: center;
}

.stripes {
    background: repeating-linear-gradient(
        -45deg,
        #bacaeb 10px,
        #bacaeb 30px,
        white 30px,
        white 50px,
        #ce0404 50px,
        #ce0404 70px,
        white 70px,
        white 90px
    );  
}

.barber-bar {
    width: 5%;
    height: 100%;
    float: right;
}

.clear {
    clear: both;
}

main {
    width: 90%;
    height: 100%;
    float: right;
}


.top-padding-block {
    height: 5%;
}


.logo-block {
    height: 30%;
}

.logo-block > img, .logo-block > svg {
    height: 100%;
}


.welcome-text-block {
    height: 45%;
    align-items: center;
}

.welcome-text > h1 {
    text-align: center;
    font-weight: 400;
    font-size: 2.5em;
    margin: 0;
}

.stuff-i-do {
    display: block;

    animation-name: fadeout;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

@keyframes fadeout {
    0%, 80% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.nav-block {
    height: 20%;
    display: flex;
    flex-direction: column;
}

nav {
    display: flex;
    width: 100%;
    padding-bottom: 0.333em;

    justify-content: center;
}

nav a {
    color: #0a0908;
    text-decoration: none;
    font-size: 1.777em;
    padding: 0 0.777em;
}

nav a:hover {
    color: #23407a;
}

.bottom-decoration {
    flex-grow: 1;
    width: 100%;
}

@media (orientation: landscape) and (max-height: 500px) {
    .welcome-text > h1 {
        font-size: 2em;
    }

    nav a {
        font-size: 1.25em;
    }
}

@media (orientation: portrait) and (max-width: 700px) {
    .welcome-text-block {
        height: 40%;
    }

    .nav-block {
        height: 25%;
        display: block;
    }

    .welcome-text > h1 {
        font-size: 2em;
    }

    nav {
        padding-bottom: 0;
        height: 100%;
    }

    nav a {
        font-size: 1.4em;
    }

    nav > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
    }

    .bottom-decoration {
        display: none;
    }
}

@media (orientation: portrait) and (max-width: 500px) {
    .welcome-text > h1 {
        font-size: 1.777em;
    }
}
`

module.exports = style(code, 'landing.css')
