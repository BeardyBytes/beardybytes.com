;(function refactoringPostsIIFE() {
  window.onload = function onLoad() {
    document
      .querySelectorAll('.code-comment')
      .forEach((element) => element.addEventListener('click', onCodeCommentClick))
  }

  function onCodeCommentClick(evt) {
    const codeComment = evt.currentTarget

    codeComment.classList.toggle('on')
    codeComment.classList.toggle('off')
  }
})()
