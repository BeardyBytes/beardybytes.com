(function siteIIFE() {
    window.onload = function onLoad() {
        document.querySelector('.comments-page').addEventListener('click', function onCommentsPageClick(evt) {
            if (evt.target.classList.contains('line-location')) {
                document.querySelectorAll('.code-panel .line-numbers-rows > span').forEach(element => {
                    if (element.textContent == evt.target.dataset.jumpTo) {
                        element.scrollIntoView();
                    }
                });
            }
        });
    };
})();
