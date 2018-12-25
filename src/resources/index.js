const css = [
    'css/main.css'
];

function toCopyable(baseUrl, entry) {
    return {
        source: `${__dirname}/${entry}`,
        destination: `${baseUrl}/${entry}`
    };
};

module.exports = function resources(baseUrl) {
    return {
        emit: [],
        copy: css.map(entry => toCopyable(baseUrl, entry))
    };
};
