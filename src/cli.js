const argv = require('yargs')
    .describe('outputDirectory', 'Path to the output directory which will contain the static site.')
    .default('outputDirectory', 'public')
    .help('h')
    .alias('h', 'help')
    .argv

const options = {
    outputDirectory: argv.outputDirectory
};

module.exports = options;
