/**
 * LogUser.js
 *
 * @description :: Lưu lại tất cả các câu trả lời nhanh của chatbox.
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