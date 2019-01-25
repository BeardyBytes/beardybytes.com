const entries = require('./entries');
const layouts = require('./layouts');

const seriesData = {
    title: 'Refactoring Series',
    urlTitle: 'refactoring'
};

function augmentWithSeriesData(series, entry) {
    const meta = Object.assign({ series }, entry.meta);

    return Object.assign({}, entry, { meta });
}

function augmentWithUrl(series, entry) {
    const meta = Object.assign({ url: `${series.baseUrl}/${entry.meta.urlTitle}` }, entry.meta);

    return Object.assign({}, entry, { meta });
}

function augmentWithPrevAndNext(entry, index, entries) {
    const previous = index > 0 ? entries[(index - 1)] : null;
    const next = index < (entries.length - 1) ? entries[(index + 1)] : null;

    const meta = Object.assign({ previous, next }, entry.meta);

    return Object.assign({}, entry, { meta });
}

module.exports = function refactoringSeries(context) {
    const series = Object.assign({}, seriesData, { baseUrl: `${context.baseUrl}/${seriesData.urlTitle}` });

    return entries
        .map(entry => entry())
        .filter(entry => !entry.meta.draft)
        .map(augmentWithSeriesData.bind(null, series))
        .map(augmentWithUrl.bind(null, series))
        .map(augmentWithPrevAndNext)
        .filter(entry => entry.meta.layout in layouts)
        .map(entry => layouts[entry.meta.layout].process(entry))
        .forEach(({ emit, copy }) => {
            context.emit.push(...(emit || []));
            context.copy.push(...(copy || []));
        })
};
