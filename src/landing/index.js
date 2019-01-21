const iteration1 = require('./iteration-1');

module.exports = function landing(baseUrl) {
    let emit = [];

    emit = emit.concat(iteration1(baseUrl).emit);

    return {
        emit,
        copy: []
    };
};
