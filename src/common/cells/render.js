const renderCells = async function renderCells(cells) {
  const output = []

  for (const cell of cells) {
    if (typeof cell === 'function') {
      output.push(await cell())
    } else {
      output.push(cell)
    }
  }

  return output.join('\n')
}

module.exports = renderCells
