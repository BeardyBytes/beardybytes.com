const entries = require('./entries')
const landing = require('./landing')
const layouts = require('./layouts')

const seriesData = {
  title: 'Az informatika számítástudományi alapjai',
}

function augmentWithSeriesData(series, entry) {
  const meta = Object.assign({ series }, entry.meta)

  return Object.assign({}, entry, { meta })
}

function augmentWithUrl(series, entry) {
  const meta = Object.assign({ url: `${series.baseUrl}/${entry.meta.urlTitle}` }, entry.meta)

  return Object.assign({}, entry, { meta })
}

function augmentWithPrevAndNext(entry, index, entries) {
  const previous = index > 0 ? entries[index - 1] : null
  const next = index < entries.length - 1 ? entries[index + 1] : null

  const meta = Object.assign({ previous, next }, entry.meta)

  return Object.assign({}, entry, { meta })
}

module.exports = async function introToCompSciSeries(context) {
  const series = Object.assign({}, seriesData, { baseUrl: context.baseUrl })

  ;[
    {
      source: `${__dirname}/css/practice.css`,
      destination: `${context.baseUrl}/css/practice.css`,
    },
    {
      source: `${__dirname}/css/landing.css`,
      destination: `${context.baseUrl}/css/landing.css`,
    },
    {
      source: `${__dirname}/images/pattern.webp`,
      destination: `${context.baseUrl}/images/pattern.webp`,
    },
    {
      source: `${__dirname}/files/01-halmazok-nyelvek-feladatsor.pdf`,
      destination: `${context.baseUrl}/files/01-halmazok-nyelvek-feladatsor.pdf`,
    },
    {
      source: `${__dirname}/files/02-determinisztikus-veges-automatak-feladatsor.pdf`,
      destination: `${context.baseUrl}/files/02-determinisztikus-veges-automatak-feladatsor.pdf`,
    },
    {
      source: `${__dirname}/files/03-minimalizalas-pumpalasi-lemma-feladatsor.pdf`,
      destination: `${context.baseUrl}/files/03-minimalizalas-pumpalasi-lemma-feladatsor.pdf`,
    },
    {
      source: `${__dirname}/files/04-nemdeterminisztikus-veges-automatak-regularis-kifejezesek-feladatsor.pdf`,
      destination: `${context.baseUrl}/files/04-nemdeterminisztikus-veges-automatak-regularis-kifejezesek-feladatsor.pdf`,
    },
  ].forEach((o) => context.copy.push(o))

  const actualEntries = entries
    .filter((entry) => !entry.meta.draft)
    .map(augmentWithSeriesData.bind(null, series))
    .map(augmentWithUrl.bind(null, series))
    .map(augmentWithPrevAndNext)
    .filter((entry) => entry.meta.layout in layouts)

  const contextWithEntries = Object.assign({}, context, { entries: actualEntries })

  context.emit.push(landing(contextWithEntries))

  for (const actualEntry of actualEntries) {
    const { emit, copy } = await layouts[actualEntry.meta.layout].process(actualEntry, context)

    context.emit.push(...(emit || []))
    context.copy.push(...(copy || []))
  }
}
