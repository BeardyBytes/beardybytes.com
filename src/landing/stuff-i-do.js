const stuffs = [
    'and I develop software.',
    'and I write code.',
    'and I know JavaScript.',
    'and I know Java.'
];

const stuffsAsString = JSON.stringify(stuffs);

const code = `
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

const inlineCode = function inlineCode(code) {
return `
    <script>
    ${code}
    </script>
    `;
};

const emitCode = function emitCode(code, context) {
    const url = `${context.baseUrl}/stuffIDo.js`;

    context.emit.push({
        content: code,
        url
    })

    return `
        <script src="${url}"></script>
    `;
};

module.exports = function stuffIDo(context, options = {}) {
    const config = Object.assign({}, context, options);

    const transformedCode = context.transform('javascript', { code });

    return config.inlineScript ? inlineCode(transformedCode, context) : emitCode(transformedCode, context);
};
