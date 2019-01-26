module.exports = {
    mergedValue(names, ...objs) {
        for (let i = 0; i < Math.min(names.length, objs.length); ++i) {
            if (Object.prototype.hasOwnProperty.call(objs[i], names[i])) {
                return objs[i][names[i]];
            }
        }

        return null;
    }
};
