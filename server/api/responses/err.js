module.exports = function (error_message, code = 403) {
    let res = this.res
    res.status(code)
    res.json({ error_message, code })
}