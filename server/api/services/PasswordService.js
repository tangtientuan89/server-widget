const crypto = require('crypto')

module.exports = passwordService = {
    genSalt: (next) => {
        crypto.randomBytes(
            16,
            (e, r) => (e) ? next(e) : next(null, r.toString('hex'))
        )
    },
    genHash: (password, salt, next) => {
        try {
            crypto.pbkdf2(
                password,
                salt,
                1000,
                64,
                'sha512',
                (e, r) => (e) ? next(e) : next(null, r.toString('hex'))
            )
        } catch (e) {
            next(e.message)
        }
    },
    validate: (password, hash, salt, next) => {
        passwordService.genHash(
            password,
            salt,
            (e, r) => (e) ? next(e) : next(null ,hash === r)
        )
    }
}