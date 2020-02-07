module.exports = function(data, code = 200) {
    let res = this.res
    res.status(code)
    res.json({ data, code })
}