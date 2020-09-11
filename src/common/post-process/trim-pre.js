module.exports = function trimPre(str) {
  const lines = str.split('\n')

  const result = []
  let isTrimmingMode = false
  let preAccumulator = null
  let indentCount = 0
  for (const line of lines) {
    if (line.trim().startsWith('<pre class="')) {
      isTrimmingMode = true

      indentCount = line.indexOf('<pre')

      preAccumulator = [line]
    } else if (line.trim().startsWith('</code>')) {
      isTrimmingMode = false

      preAccumulator.push(line)

      const preOpening = preAccumulator.shift()
      const preEnding = preAccumulator.pop()

      preAccumulator[0] = preOpening + preAccumulator[0]
      preAccumulator[preAccumulator.length - 1] += preEnding

      result.push(...preAccumulator)
    } else if (isTrimmingMode) {
      preAccumulator.push(line.substr(indentCount))
    } else {
      result.push(line)
    }
  }

  return result.join('\n')
}
