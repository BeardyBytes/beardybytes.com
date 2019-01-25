const { readFileSync } = require('fs');

const cache = new Map();

function logoNameToPath(logoName) {
    return `${__dirname}/${logoName}.svg`;
};

function readSvg(logoName) {
    if (!cache.has(logoName)) {
        cache.set(logoName, readFileSync(logoNameToPath(logoName)));
    }

    return cache.get(logoName);
};

module.exports = function logo(context, options = {}) {
    const { optimizeSVG, inlineSVG, variant } = Object.assign({}, context, options);

    const logoName = `logo-${variant}-${optimizeSVG ? 'optimized' : ''}`;

    if (inlineSVG) {
        const svg = readSvg(logoName);

        return svg;
    } else {
        const url = `/${context.imgPath}/${logoName}.svg`;

        context.copy.push({
            source: logoNameToPath(logoName),
            destination: url
        });

        return `<img src=${url}>`;
    }
};
