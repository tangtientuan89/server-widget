'use strict'
module.exports = function sendErr(message) {
    var res = this.res
    res.status(200)
    res.json({ error_message: message })
}