module.exports = {
  tagConcat: (fragments, interpolations) =>
    interpolations.reduce((acc, curr, index) => acc.concat(curr, fragments[index + 1]), [fragments[0]]).join('\n'),
}
