'use strict'
module.exports = function sendErr(message = 'Server error, please contact to administrator') {
    var res = this.res
    res.status(500)
    res.json({ error_message: message, code: 500 })
}