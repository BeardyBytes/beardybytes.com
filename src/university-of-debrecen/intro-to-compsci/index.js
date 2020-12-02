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
    {
      source: `${__dirname}/files/05-regularis-kifejezesbol-automata-es-vissza-feladatsor.pdf`,
      destination: `${context.baseUrl}/files/05-regularis-kifejezesbol-automata-es-vissza-feladatsor.pdf`,
    },
    {
      source: `${__dirname}/files/elso-zarthelyi-gyakorlo-feladatsor.pdf`,
      destination: `${context.baseUrl}/files/elso-zarthelyi-gyakorlo-feladatsor.pdf`,
    },
    {
      source: `${__dirname}/files/07-regularis-es-kornyezetfuggetlen-grammatikak-feladatsor.pdf`,
      destination: `${context.baseUrl}/files/07-regularis-es-kornyezetfuggetlen-grammatikak-feladatsor.pdf`,
    },
    {
      source: `${__dirname}/files/08-chomsky-normalforma-cyk-algoritmus-feladatsor.pdf`,
      destination: `${context.baseUrl}/files/08-chomsky-normalforma-cyk-algoritmus-feladatsor.pdf`,
    },
    {
      source: `${__dirname}/files/09-pumpalasi-lemma-kornyezetfuggetlen-nyelvekre-veremautomatak-feladatsor.pdf`,
      destination: `${context.baseUrl}/files/09-pumpalasi-lemma-kornyezetfuggetlen-nyelvekre-veremautomatak-feladatsor.pdf`,
    },
    {
      source: `${__dirname}/files/10-kornyezetfuggetlen-nyelvek-veremautomatak-feladatsor.pdf`,
      destination: `${context.baseUrl}/files/10-kornyezetfuggetlen-nyelvek-veremautomatak-feladatsor.pdf`,
    },
    {
      source: `${__dirname}/files/08-cyk-1.svg`,
      destination: `${context.baseUrl}/files/08-cyk-1.svg`,
    },
    {
      source: `${__dirname}/files/08-cyk-2.svg`,
      destination: `${context.baseUrl}/files/08-cyk-2.svg`,
    },
    {
      source: `${__dirname}/files/08-cyk-3.svg`,
      destination: `${context.baseUrl}/files/08-cyk-3.svg`,
    },
    {
      source: `${__dirname}/files/08-cyk-4.svg`,
      destination: `${context.baseUrl}/files/08-cyk-4.svg`,
    },
    {
      source: `${__dirname}/files/09-1-a.svg`,
      destination: `${context.baseUrl}/files/09-1-a.svg`,
    },
    {
      source: `${__dirname}/files/09-1-b.svg`,
      destination: `${context.baseUrl}/files/09-1-b.svg`,
    },
    {
      source: `${__dirname}/files/09-3-a.svg`,
      destination: `${context.baseUrl}/files/09-3-a.svg`,
    },
    {
      source: `${__dirname}/files/09-5-d.svg`,
      destination: `${context.baseUrl}/files/09-5-d.svg`,
    },
    {
      source: `${__dirname}/files/11-top-down-es-bottom-up-veremautomatak-ll-elemzok-feladatsor.pdf`,
      destination: `${context.baseUrl}/files/11-top-down-es-bottom-up-veremautomatak-ll-elemzok-feladatsor.pdf`,
    },
    {
      source: `${__dirname}/files/12-turing-gep-feladatsor.pdf`,
      destination: `${context.baseUrl}/files/12-turing-gep-feladatsor.pdf`,
    },
    {
      source: `${__dirname}/files/10-3-b.svg`,
      destination: `${context.baseUrl}/files/10-3-b.svg`,
    },
    {
      source: `${__dirname}/files/10-3-c.svg`,
      destination: `${context.baseUrl}/files/10-3-c.svg`,
    },
    {
      source: `${__dirname}/files/10-4-a.svg`,
      destination: `${context.baseUrl}/files/10-4-a.svg`,
    },
    {
      source: `${__dirname}/files/10-4-b.svg`,
      destination: `${context.baseUrl}/files/10-4-b.svg`,
    },
    {
      source: `${__dirname}/files/10-5-30.svg`,
      destination: `${context.baseUrl}/files/10-5-30.svg`,
    },
    {
      source: `${__dirname}/files/10-5-31.svg`,
      destination: `${context.baseUrl}/files/10-5-31.svg`,
    },
    {
      source: `${__dirname}/files/10-5-a.svg`,
      destination: `${context.baseUrl}/files/10-5-a.svg`,
    },
    {
      source: `${__dirname}/files/10-5-b.svg`,
      destination: `${context.baseUrl}/files/10-5-b.svg`,
    },
    {
      source: `${__dirname}/files/10-top-down.svg`,
      destination: `${context.baseUrl}/files/10-top-down.svg`,
    },
    {
      source: `${__dirname}/files/10-bottom-up.svg`,
      destination: `${context.baseUrl}/files/10-bottom-up.svg`,
    },
    {
      source: `${__dirname}/files/11-1-bottom-up.svg`,
      destination: `${context.baseUrl}/files/11-1-bottom-up.svg`,
    },
    {
      source: `${__dirname}/files/11-1-top-down.svg`,
      destination: `${context.baseUrl}/files/11-1-top-down.svg`,
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
