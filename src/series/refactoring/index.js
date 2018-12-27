const posts = (function loadPosts() {
    const posts = require('./posts');

    posts.sort((a, b) => a.date - b.date);

    return posts;
})();

const postLayout = require('./layout/post');

const seriesData = {
    title: 'Refactoring Series',
    urlTitle: 'refactoring'
};

function compileSeries(series) {
    return series.posts
        .map(post => Object.assign({}, post, { content: post.content(series) }))
        .map(post => Object.assign({}, post, { content: postLayout(post, series, {}) }))
        .map(post => ({ content: post.content, url: post.url }));
};

module.exports = function refactoringSeries(baseUrl) {
    const series = Object.assign({}, seriesData, { baseUrl: `${baseUrl}/${seriesData.urlTitle}` });

    series.posts = posts
        .map(post => Object.assign({}, post, { url: `${series.baseUrl}/${post.urlTitle}` }))
        .map((post, index, arr) => {
            const previous = index > 0 ? (index - 1) : null;
            const next = index < (arr.length - 1) ? (index + 1) : null;

            return Object.assign({}, post, { previous, next });
        });

    const siteLayout = require('./layout/site');

    const sitePage = {
        content: siteLayout(),
        url: `${baseUrl}/${seriesData.urlTitle}/site`
    };

    return {
        emit: [...compileSeries(series), sitePage],
        copy: []
    };
};
