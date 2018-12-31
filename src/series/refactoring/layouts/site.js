const { html } = require('common-tags');

const { codeBlockWithNumbering } = require('../../../common/cells/code');
const diffBlock = require('../../../common/cells/diff');


const POST_DATE_FORMAT = 'LLLL dd, y';

const elements = {
    head({ title }) {
        return html`
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
    
            <title>${title}</title>
    
            <meta name="viewport" content="width=device-width, initial-scale=1">
    
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono|IBM+Plex+Sans|IBM+Plex+Serif">
    
            <link rel="stylesheet" href="/resources/css/normalize.css">
            <link rel="stylesheet" href="/resources/css/refactoring/main.css">

            <link rel="stylesheet" href="/resources/css/code/code-comment.css">
            <link rel="stylesheet" href="/resources/css/code/diff.css">
            <link rel="stylesheet" href="/resources/css/code/prism.css">
            <link rel="stylesheet" href="/resources/css/code/line-numbers.css">
            <link rel="stylesheet" href="/resources/css/refactoring/code/prism.css">
            <link rel="stylesheet" href="/resources/css/refactoring/code/diff.css">
        `;
    },
    header() {
        return html`
            <div class="top-menu"></div>
        `;
    },
    footer() {
        return html``
    }
};

const previousEntryLink = entry => html`
<a href="${entry.meta.url}" class="menu-entry">
    <div class="menu-entry-element menu-entry-text">
        Previous Entry in Series
    </div>
    <div class="clear"></div>
</a>
`;

const nextEntryLink = entry => html`
<a href="${entry.meta.url}" class="menu-entry">
    <div class="menu-entry-element menu-entry-text">
        Next Entry in Series
    </div>
    <div class="clear"></div>
</a>
`;

const commit = (commit, index) => html`
<div class="commit ${index == 0 ? 'active' : ''}">
    <a class="commit-hash" href="${commit.url}">
        ${commit.hash}
    </a>
    <div class="commit-message">
        ${commit.message}
    </div>
</div>
`;

const location = location => ({
    line: html`
    <span data-jump-to="${location.jumpTo}" class="line-location">
        ${location.content}
    </span>
    `
})[location.type];

const comment = (comment, index, comments) => html`
<div class="comment">
    <div class="comment-head">
        <div class="comment-title">
            <span class="counter">
                ${index + 1}/${comments.length}
            </span>
            <span class="text">
                ${comment.title}
            </span>
        </div>
        <div class="comment-location">
            <span class="text">
            Location:
            </span>
            ${comment.locations.map(location).join(', ')}
        </div>
    </div>
    <div class="comment-body">
        ${comment.content}
    </div>
</div>
`;

const commitContent = commit => ({
    comments: commit.comments.map(comment).join('\n'),
    code: codeBlockWithNumbering(commit.language)([commit.code]),
    diffFirst: commit.diffFirst ? diffBlock(commit.language)([commit.diffFirst]) : null,
    diffPrevious: commit.diffPrevious ? diffBlock(commit.language)([commit.diffPrevious]) : null
});

const toLineArrayString = str => {
    // TODO: Escape backticks!
    const lines = str.split('\n')

    // First line is collapsed to avoid the empty line in the <pre> element.
    const firstLine = lines.shift();

    lines[0] = firstLine + lines[0];

    const base = lines.map(line => `\`${line}\``)
        .join(',');

    return `[${base}]`;
}

const inlineFirstCommit = content => {
    const diffFirst = content.diffFirst ? `${toLineArray(content.diffFirst)}` : 'null';
    const diffPrevious = content.diffPrevious ? `${toLineArray(content.diffPrevious)}` : 'null';

    console.log(content.code);

    return html`
<script type="text/javascript">
(function inlineFirstCommitIIFE() {
    const firstCommit = {
        comments: \`${content.comments}\`,
        code: ${toLineArrayString(content.code)},
        diffFirst: ${diffFirst},
        diffPrevious: ${diffPrevious}
    };

    initFirstCommit(firstCommit);
})();
</script>
`;
};

const main = entry => html`
<!doctype html>
<html>

<head>
    ${elements.head({ title: entry.content.title })}
</head>

<body>
    <div class="site">
        <div class="panel menu-panel">
            <div class="top-menu">
                <div class="top-menu-entry inactive home-button">
                    <img src="/resources/img/home-outline.svg" />
                </div>
                <div class="top-menu-entry inactive commits-button">
                    <img src="/resources/img/code-outline.svg" />
                </div>
                <div class="top-menu-entry active comments-button">
                    <img src="/resources/img/message-square-outline.svg" />
                </div>
            </div>
            <div class="bottom-menu">
                <div class="bottom-menu-entry next-commit-button">
                    <img src="/resources/img/arrow-ios-back-outline.svg" />
                </div>
                <div class="bottom-menu-entry previous-commit-button">
                    <img src="/resources/img/arrow-ios-forward-outline.svg" />
                </div>
            </div>
        </div>
        <div class="panel content-panel">
            <div class="panel side-panel">
                <div class="page inactive home-page">
                    <div class="title">
                        <h1>${entry.meta.series.title}</h1>
                        <h2>${entry.content.title}</h2>
                        <div class="post-date">Posted at ${entry.meta.publishedAt.toFormat(POST_DATE_FORMAT)}.</div>
                    </div>
                    <div class="menu">
                        <a href="#" class="menu-entry">
                            <div class="menu-entry-element menu-entry-text">
                                Beardy Bytes home
                            </div>
                            <div class="clear"></div>
                        </a>
                        <a href="#" class="menu-entry">
                            <div class="menu-entry-element menu-entry-text">
                                Refactoring Series home
                            </div>
                            <div class="clear"></div>
                        </a>
                        ${entry.meta.previous ? previousEntryLink(entry.meta.previous) : ''}
                        ${entry.meta.next ? nextEntryLink(entry.meta.next) : ''}
                    </div>
                    <div class="description">
                        ${entry.content.description}
                    </div>
                </div>
                <div class="page inactive commits-page">
                    <div class="page-content-wrapper">
                        <div>
                            <h1>Commits</h1>
                        </div>
                        <p>
                            You can step forward and backward in the refactoring process by clicking on the appropriate commit.
                        </p>
                        <p>
                            Clicking on the hash link will take you to the GitHub page of the commit.
                        </p>
                    </div>
                    <div class="commits">
                        ${entry.content.commits.map(commit).join('\n')}
                    </div>
                </div>
                <div class="page active comments-page">
                    <div class="page-content-wrapper">
                        <div>
                            <h1>Overview</h1>
                        </div>
                        <p>
                            Here you find a detailed explanation of the changes made in the commit, as well as the process of identifying the next steps.
                        </p>
                    </div>
                    <div class="comments">
                    </div>
                </div>
            </div>
            <div class="panel code-panel">
                <div class="page active code-page">
                </div>
                <div class="page inactive diff-previous-page">
                </div>
                <div class="page inactive diff-first-page">
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="clear"></div>
    </div>
    <script type="text/javascript" src="/resources/script/refactoring-site.js"></script>
    ${inlineFirstCommit(commitContent(entry.content.commits[0]))}
</body>

</html>
`;

const processCommit = (url, commit, index) => {
    const content = commitContent(commit);

    return {
        url: `${url}-commit-${index}.json`,
        content: JSON.stringify(content)
    };
};

const processCommits = (url, commits) => commits
    .map(processCommit.bind(null, url))
    .reduce((acc, curr) => acc.concat(curr), []);

const process = entry => ({
    emit: [{
        url: `${entry.meta.url}.html`,
        content: main(entry)
    },
    ...processCommits(entry.meta.url, entry.content.commits)
    ]
});

module.exports = {
    name: 'site',
    process
};
