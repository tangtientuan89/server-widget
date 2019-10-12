const mongo = {}

mongo.indexes = (name, fields, options) => {
    global[name]
        .getDatastore()
        .manager
        .collection(name.toLowerCase())
        .ensureIndex(
            fields,
            options,
            (e, r) => {
                if (e) {
                    console.log(`[ERR][INDEX]:::${name}:::${e}`)
                    return
                }
                console.log(`[DONE][INDEX]:::${name}:::${r}`)
            }
        )
}

module.exports = mongo