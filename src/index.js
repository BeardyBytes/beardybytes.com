const fs = require('fs').promises
const util = require('util')

const mkdirp = require('mkdirp')

const rimraf = util.promisify(require('rimraf'))

const trimPre = require('./common/post-process/trim-pre')

const transformers = require('./transformers')

const config = require('./config')

;(async function main() {
  printConfiguration()

  await rimraf(config.outputDirectory)

  await fs.mkdir(config.outputDirectory)

  processModule('./resources', {
    baseUrl: 'resources',
  })

  processModule('./university-of-debrecen/intro-to-compsci', {
    baseUrl: 'university-of-debrecen/intro-to-compsci',
  })
})()

function printConfiguration() {
  console.log('>>> CONFIGURATION')
  console.log(JSON.stringify(config, null, 2))
  console.log('<<<')
}

async function processModule(modulePath, context) {
  console.log(`Module: ${modulePath}`)

  const moduleContext = makeModuleContext(context)

  await require(modulePath)(moduleContext)

  console.log(`Copy: ${moduleContext.copy.length}, Emit: ${moduleContext.emit.length}`)

  moduleContext.copy.forEach(async (resource) => await copyResource(resource))
  moduleContext.emit.forEach(async (resource) => await emitResource(resource))

  console.log()
}

async function emitResource(page) {
  console.log(`  Emit: ${page.url}`)

  const path = `${config.outputDirectory}/${page.url}`

  const fragments = path.split('/')

  fragments.pop()

  await mkdirp(fragments.join('/'))

  await fs.writeFile(path, trimPre(page.content))
}

async function copyResource(resource) {
  console.log(`  Copy: ${resource.source}\n     -> ${resource.destination}`)

  const path = `${config.outputDirectory}/${resource.destination}`

  const fragments = path.split('/')

  fragments.pop()

  await mkdirp(fragments.join('/'))

  await fs.copyFile(resource.source, path)
}

function makeModuleContext(context) {
  const base = {
    transform(type, options) {
      return transformers[type](options)
    },
    emit: [],
    copy: [],
  }

  return Object.assign(base, context, config)
}
