const convict = require('convict');

const commandLineOptions = require('./cli');

const schema = require('../config/schema.js');

const config = convict(schema);

const environmentConfigFile = `config/${config.get('env' )}.json`;

config.loadFile(environmentConfigFile);
config.load(commandLineOptions);

config.validate({ allowed: 'strict' });

module.exports = Object.freeze(config.getProperties());
