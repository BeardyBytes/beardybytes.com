const css = [
    'css/landing.css',
    
    'css/main.css',
    'css/normalize.css',
    
    'css/refactoring/main.css',
    'css/refactoring/code/prism.css',
    'css/refactoring/code/diff.css',

    'css/code/code-comment.css',
    'css/code/diff.css',
    'css/code/line-numbers.css',
    'css/code/prism.css'
];

const img = [
    'img/eye-outline.svg',
    'img/eye-off-outline.svg',
    'img/link-2-outline.svg',

    'img/arrow-ios-back-outline.svg',
    'img/arrow-ios-forward-outline.svg',
    'img/message-square-outline.svg',
    'img/code-outline.svg',
    'img/home-outline.svg',
    'img/beardy-bytes-logo-no-text.svg',
];

const script = [
    'script/refactoring-posts.js',
    'script/refactoring-site.js'
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
