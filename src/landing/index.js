const iteration1 = require('./iteration-1');
const iteration2 = require('./iteration-2');

module.exports = function landing(baseUrl) {
    let emit = [];

    emit = emit.concat(iteration1(baseUrl).emit);
    emit = emit.concat(iteration2(baseUrl).emit);

    return {
        emit,
        copy: []
    };
};
