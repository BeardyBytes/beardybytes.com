const css = [
    'css/main.css',
    'css/code.css'
];

const img = [
    'img/eye-outline.svg',
    'img/eye-off-outline.svg'
];

const script = [
    'script/refactoring-posts.js'
];

function toCopyable(baseUrl, entry) {
    return {
        source: `${__dirname}/${entry}`,
        destination: `${baseUrl}/${entry}`
    };
};

module.exports = function resources(baseUrl) {
    const copyToBase = toCopyable.bind(null, baseUrl);

    return {
        emit: [],
        copy: [css, img, script]
            .reduce((acc, curr) => acc.concat(curr), [])
            .map(copyToBase)
    };
};
