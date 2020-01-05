'use strict'
module.exports = function sendErr(message) {
    var res = this.res
    res.status(403)
    res.json({ error_message: message, code: 403 })
}