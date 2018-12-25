const fs = require('fs').promises;
const util = require('util');

const rimraf = util.promisify(require('rimraf'));
const mkdirp = util.promisify(require('mkdirp'));


const options = require('./cli');

const refactoringSeries = require('./series/refactoring');

async function emitPage(page) {
    const path = `${options.outputDirectory}/${page.url}.html`;

    const fragments = path.split('/');

    fragments.pop();

    await mkdirp(fragments.join('/'));

    await fs.writeFile(path, page.content);
};

(async function main() {
    await rimraf(options.outputDirectory);

    await fs.mkdir(options.outputDirectory);

    const refactoring = refactoringSeries('series');

    for (const page of refactoring.emit) {
        await emitPage(page);
    }
})();
