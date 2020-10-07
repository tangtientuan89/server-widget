/**
 * LogUser.js
 *
 * @description :: Lưu lại tất cả hoạt động của user trên hệ thống.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        fb_page_id: {
            type: 'string'
        },
        title: {
            type: 'string'
        },
        content: {
            type: 'string'
        }
    }
};