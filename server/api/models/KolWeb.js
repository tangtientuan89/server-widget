/**
 * LogUser.js
 *
 * @description :: Lưu lại tất cả thông tin người dùng.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string'
        },
        phone: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        note: {
            type: 'string'
        }
    }
};  