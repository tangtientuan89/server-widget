module.exports = function (
    error_message = 'Server error, please contact to administrator',
    code = 500
) {
    let res = this.res
    res.status(code)
    res.json({ error_message, code })
}