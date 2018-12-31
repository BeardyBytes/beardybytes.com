const initFirstCommit = (function siteIIFE() {
    let elements = null;

    let Store = {
        commits: Object.create(null),
        activeCommitIndex: 1,
        activeSidePanelPage: 'home',
        activeCodePanelPage: 'code'
    };

    window.onload = function onLoad() {
        elements = {
            menuPanel: {
                topMenuButtons: document.querySelectorAll('.top-menu-entry'),
                homeButton: document.querySelector('.home-button'),
                commitsButton: document.querySelector('.commits-button'),
                commentsButton: document.querySelector('.comments-button'),
                nextCommitButton: document.querySelector('.next-commit-button'),
                previousCommitButton: document.querySelector('.previous-button'),
            },
            sidePanel: {
                pages: document.querySelectorAll('.side-panel > .page'),
                homePage: document.querySelector('.side-panel > .home-page'),
                commitsPage: document.querySelector('.side-panel > .commits-page'),
                commitsContainer: document.querySelector('.commits'),
                commits: document.querySelectorAll('.commit'),
                commentsPage: document.querySelector('.side-panel > .comments-page'),
                commentsContainer: document.querySelector('.comments')
            },
            codePanel: {
                pages: document.querySelectorAll('.code-panel > .page'),
                codePage: document.querySelector('.code-panel > .code-page'),
                diffPreviousPage: document.querySelector('.code-panel > .diff-previous-page'),
                diffFirstPage: document.querySelector('.code-panel > .diff-first-page'),
            }
        };

        document.querySelector('.comments-page').addEventListener('click', function onCommentsPageClick(evt) {
            if (evt.target.classList.contains('line-location')) {
                document.querySelectorAll('.code-panel .line-numbers-rows > span').forEach(element => {
                    if (element.textContent == evt.target.dataset.jumpTo) {
                        element.scrollIntoView();
                    }
                });
            }
        });

        displayActiveCommit();
    };

    const fromLineArray = arr => arr.join('\n');

    function displayActiveCommit() {
        elements.sidePanel.commits.forEach((commit, index) => {
            if (index == Store.activeCommitIndex) {
                commit.classList.add('active');
            } else {
                commit.classList.remove('active');
            }
        });

        const activeCommit = Store.commits[Store.activeCommitIndex];

        elements.sidePanel.commentsContainer.innerHTML = activeCommit.comments;
        elements.codePanel.codePage.innerHTML = activeCommit.code;

        elements.codePanel.diffPreviousPage.innerHTML = activeCommit.diffPrevious || '';
        elements.codePanel.diffFirstPage.innerHTML = activeCommit.diffFirst || '';
    }

    return function initFirstCommit(commit) {
        const initializedCommit = {
            comments: commit.comments,
            code: fromLineArray(commit.code)
        };

        console.log(initializedCommit.code);

        const commits = Object.assign({ 1: initializedCommit }, Store.commits);

        Store = Object.assign({}, Store, { commits });
    };
})();
