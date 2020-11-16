/**
 * @description :: Lưu lại thông tin cấu hình widget.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        fb_page_id: {
            type: 'string'
        },
        asid: {
            type: 'string'
        },
        setting_data: {
            type: 'json'
        }
    }
};