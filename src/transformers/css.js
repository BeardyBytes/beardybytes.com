var CleanCSS = require('clean-css');

const config = require('../config');

function transformer(options) {
    const shouldMinify = Object.assign({}, config, options).minifyCSS;

    return shouldMinify ? new CleanCSS(options).minify(options.code).styles : options.code;
};

transformer.type = 'css';

module.exports = transformer;
