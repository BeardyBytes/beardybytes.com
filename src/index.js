const fs = require('fs').promises;
const util = require('util');

const rimraf = util.promisify(require('rimraf'));
const mkdirp = util.promisify(require('mkdirp'));

const trimPre = require('./common/post-process/trim-pre');

const config = require('./config');


(async function main() {
    await rimraf(config.outputDirectory);

    await fs.mkdir(config.outputDirectory);

    processModule('./resources', makeContextFrom({
        baseUrl: 'resources'
    }));

    processModule('./series/refactoring', makeContextFrom({
        baseUrl: 'series'
    }));

    processModule('./landing', makeContextFrom({
        baseUrl: ''
    }));
})();


async function processModule(modulePath, context) {
    const results = require(modulePath)(context);

    results.copy.forEach(async resource => await copyResource(resource));
    results.emit.forEach(async resource => await emitResource(resource))
}

async function emitResource(page) {
    const path = `${config.outputDirectory}/${page.url}`;

    const fragments = path.split('/');

    fragments.pop();

    await mkdirp(fragments.join('/'));

    await fs.writeFile(path, trimPre(page.content));
    //await fs.writeFile(path, page.content);
};

async function copyResource(resource) {
    const path = `${config.outputDirectory}/${resource.destination}`;

    const fragments = path.split('/');

    fragments.pop();

    await mkdirp(fragments.join('/'));

    await fs.copyFile(resource.source, path);
}

function makeContextFrom(context) {
    return Object.assign({}, context, config);
}
