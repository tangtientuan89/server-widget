const bcrypt = require('bcryptjs')

module.exports = {
    'hash_password': (password, round = 6) => {
        const salt = bcrypt.genSaltSync(round)
        const hash = bcrypt.hashSync(password, salt)
        return hash
    },
    /**
     * true / false
     */
    'check_password': (password, hash) => {
        const check = bcrypt.compareSync(password, hash)
        return check
    }
}