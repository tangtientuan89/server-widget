'use strict'
module.exports = function sendOK(data) {
    var res = this.res
    res.status(200)
    res.json({ data: data, code: 200 })
}