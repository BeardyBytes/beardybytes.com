const css = [
    'css/main.css',
    'css/normalize.css',
    
    'css/code/code-comment.css',
    'css/code/diff.css',
    'css/code/line-numbers.css',
    'css/code/prism.css'
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
