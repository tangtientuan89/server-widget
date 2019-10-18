const crypto = require('crypto')
const password_service = {}

password_service.gen_salt = () => crypto.randomBytes(16).toString('hex')
password_service.gen_hash = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`)
}
password_service.validate = (password, hash, salt) => {
    return hash === password_service.gen_hash(password, salt)
}

module.exports = password_service