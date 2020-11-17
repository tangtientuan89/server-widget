/**
 * NameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    'ping': (req, res) => {
        res.ok('ping')
    },
    'create_setting': (req, res) => {
        let p = req.allParams()
        if (!p.fb_page_id) return res.err("Require fb_page_id");
        if (!p.asid) return res.err("Require asid");
        if (!p.secret_key) return res.err("Require secret_key");

        async.waterfall([
            (next) => {
                WidgetSetting
                    .create({
                        fb_page_id: p.fb_page_id,
                        asid: p.asid,
                        secret_key: p.secret_key,
                        setting_data: p.setting_data
                    })
                    .fetch()
                    .exec((e, r) => {
                        next(e, r)
                    })
            }
        ], (e, r) => (e) ? res.err(e) : res.ok(r))
    },
    'read_setting': (req, res) => {
        let p = req.allParams()
        if (!p.fb_page_id) return res.err("Require fb_page_id");

        let id = p.id
        let search = p.search
        let skip = p.skip || 0
        let limit = p.limit || 20
        let sort = p.sort || 'updatedAt DESC'

        delete p.id
        delete p.search
        delete p.skip
        delete p.limit
        delete p.sort

        async.waterfall([
            (next) => {
                WidgetSetting
                    .find(p)
                    .skip(skip)
                    .limit(limit)
                    .sort(sort)
                    .exec((e, r) => (e) ? next(e) : next(null, r))

            }
        ], (e, r) => (e) ? res.err(e) : res.ok(r))
    },
    'update_setting': (req, res) => {
        let p = req.allParams()
        let id = p.id
        delete p.id

        if (!id) return res.err("Require id")

        async.waterfall([
            (next) => {
                WidgetSetting
                    .updateOne({ id })
                    .set(p)
                    .exec((e, r) => {
                        next(e, r)
                    })
            }
        ], (e, r) => (e) ? res.err(e) : res.ok(r))
    },
    'delete_setting': (req, res) => {
        let p = req.allParams()
        let id = p.id
        delete p.id

        if (!id) return res.err("Require id")

        async.waterfall([
            (next) => {
                WidgetSetting
                    .destroy({ id })
                    .exec((e, r) => {
                        next(e, r)
                    })
            }
        ], (e, r) => (e) ? res.err(e) : res.ok(r))
    }
};

