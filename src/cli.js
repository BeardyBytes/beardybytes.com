const argv = require('yargs')
    .describe('outputDirectory', 'Path to the output directory which will contain the static site.')
    .demandOption([ 'outputDirectory' ])
    .help('h')
    .alias('h', 'help')
    .argv

const options = {
    outputDirectory: argv.outputDirectory
};

module.exports = options;
