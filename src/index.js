const fs = require('fs').promises;
const util = require('util');

const rimraf = util.promisify(require('rimraf'));
const mkdirp = util.promisify(require('mkdirp'));


const options = require('./cli');

async function emitPage(page) {
    const path = `${options.outputDirectory}/${page.url}.html`;

    const fragments = path.split('/');

    fragments.pop();

    await mkdirp(fragments.join('/'));

    await fs.writeFile(path, page.content);
};

async function copyResource(resource) {
    const path = `${options.outputDirectory}/${resource.destination}`;

    const fragments = path.split('/');

    fragments.pop();

    await mkdirp(fragments.join('/'));

    await fs.copyFile(resource.source, path);
}

(async function main() {
    await rimraf(options.outputDirectory);

    await fs.mkdir(options.outputDirectory);

    const resources = require('./resources')('resources');

    for (const resource of resources.copy) {
        await copyResource(resource);
    }

    const refactoring = require('./series/refactoring')('series');

    for (const page of refactoring.emit) {
        await emitPage(page);
    }
})();
