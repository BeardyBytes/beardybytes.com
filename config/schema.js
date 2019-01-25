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
    },
    minifyCSS: {
        doc: 'Minify CSS code.',
        format: Boolean,
        default: true
    },
    imagePath: {
        doc: 'Path of output image files.',
        format: String,
        default: 'resources/img/'
    },
    javascriptPath: {
        doc: 'Path of output JavaScript files.',
        format: String,
        default: 'resources/script/'
    },
    cssPath: {
        doc: 'Path of output CSS files.',
        format: String,
        default: 'resources/css/'
    }
};
