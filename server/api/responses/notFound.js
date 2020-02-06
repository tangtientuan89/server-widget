'use strict'
module.exports = function sendErr(message = 'Api not found') {
    var res = this.res
    res.status(404)
    res.json({ error_message: message, code: 404 })
}