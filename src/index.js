const fs = require('fs').promises;
const util = require('util');

const rimraf = util.promisify(require('rimraf'));
const mkdirp = util.promisify(require('mkdirp'));

const trimPre = require('./common/post-process/trim-pre');

const transformers = require('./transformers');

const config = require('./config');


(async function main() {
    await rimraf(config.outputDirectory);

    await fs.mkdir(config.outputDirectory);

    processModule('./resources', {
        baseUrl: 'resources'
    });

    processModule('./series/refactoring', {
        baseUrl: 'series'
    });

    processModule('./landing', {
        baseUrl: ''
    });
})();


async function processModule(modulePath, context) {
    const moduleContext = makeModuleContext(context);

    require(modulePath)(moduleContext);

    moduleContext.copy.forEach(async resource => await copyResource(resource));
    moduleContext.emit.forEach(async resource => await emitResource(resource))
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

function makeModuleContext(context) {
    const base = {
        transform(type, options) {
            return transformers[type](options);
        },
        emit: [],
        copy: []
    };

    return Object.assign(base, context, config);
}
