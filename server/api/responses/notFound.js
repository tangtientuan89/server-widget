module.exports = function (error_message = 'Api not found', code = 404) {
    let res = this.res
    res.status(code)
    res.json({ error_message, code })
}