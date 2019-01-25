module.exports = {
    env: {
        doc: 'The application environment.',
        format: ['development', 'production'],
        default: 'development',
        env: 'NODE_ENV'
    },
    outputDirectory: {
        doc: 'Path to the output directory which will contain the static site.',
        format: String,
        default: 'public'
    },
    minifyJavaScript: {
        doc: 'Minify JavaScript code.',
        format: Boolean,
        default: true
    }
};
