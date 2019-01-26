const script = require('../common/script');

const stuffs = [
    'and I develop software.',
    'and I write code.',
    'and I know JavaScript.',
    'and I know Java.'
];

const stuffsAsString = JSON.stringify(stuffs);

const code =  () => `
(function stuffIDoIIFE() {
    // The stuff can only be changed on every second animationiteration event, because the
    // alternating direction triggers the event even when the text has faded in.
    let canChangeStuff = true;

    let currentStuffIndex = 0;

    const stuffs = ${stuffsAsString};

    window.onload = function onLoad() {
        document.querySelector('.stuff-i-do').addEventListener('animationiteration', onAnimationIteration);
    };

    function onAnimationIteration(event) {
        if (canChangeStuff) {
            event.target.textContent = randomStuff();
        }

        canChangeStuff = !canChangeStuff;
    };

    function randomStuff() {
        // Avoid showing the same stuff twice consecutively.
        let index;
        do {
            index = Math.floor(Math.random() * stuffs.length);
        } while (index == currentStuffIndex)

        currentStuffIndex = index;

        return stuffs[currentStuffIndex];
    }
})();
`

module.exports = script(code, 'landing.js');
