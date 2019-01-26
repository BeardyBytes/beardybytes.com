const { mergedValue } = require('../util/merge');

const inlineCode = function inlineCode(code) {
return `
    <style>
    ${code}
    </style>
    `;
};

const emitCode = function emitCode(code, context) {
    const url = `${context.cssPath}/${context.path}`;

    context.emit.push({
        content: code,
        url
    })

    return `
        <link rel="stylesheet" src="${url}">
    `;
};

module.exports = function style(code, path) {
    return function styleEmitter(context, options = {}) {
        const config = Object.assign({}, context, options);

        config.inline = mergedValue(['inline', 'inlineCSS'], options, context);
        config.minify = mergedValue(['minify', 'minifyCSS'], options, context);
        config.code = code(config);
        config.path = path;
    
        const transformedCode = context.transform('css', config);
    
        return config.inline ? inlineCode(transformedCode, config) : emitCode(transformedCode, config);
    };
};
