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
    'create_answer': (req, res) => {
        let p = req.allParams()
        if (!p.fb_page_id) return res.err("Require fb_page_id");
        if (!p.content) return res.err("Require content");

        async.waterfall([
            (next) => {
                QuickAnswer
                    .create({
                        fb_page_id: p.fb_page_id,
                        title: p.title,
                        content: p.content
                    })
                    .fetch()
                    .exec((e, r) => {
                        next(e, r)
                    })
            }
        ], (e, r) => (e) ? res.err(e) : res.ok(r))
    },
    'read_answer': (req, res) => {
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
                if (search) {
                    QuickAnswer
                        .find({
                            ...p,
                            ...{
                                or: [
                                    {
                                        content: {
                                            contains: search
                                        }
                                    }
                                ]
                            }
                        })
                        .skip(skip)
                        .limit(limit)
                        .sort(sort)
                        .exec((e, r) => (e) ? next(e) : next(null, r))
                    return
                }
                if (id) {
                    QuickAnswer
                        .findOne(id)
                        .exec((e, r) => (e) ? next(e) : next(null, r))
                    return
                }
                QuickAnswer
                    .find(p)
                    .skip(skip)
                    .limit(limit)
                    .sort(sort)
                    .exec((e, r) => (e) ? next(e) : next(null, r))

            }
        ], (e, r) => (e) ? res.err(e) : res.ok(r))
    },
    'update_answer': (req, res) => {
        let p = req.allParams()
        let id = p.id
        delete p.id

        if (!id) return res.err("Require ID")

        async.waterfall([
            (next) => {
                QuickAnswer
                    .updateOne({ id })
                    .set(p)
                    .exec((e, r) => {
                        next(e, r)
                    })
            }
        ], (e, r) => (e) ? res.err(e) : res.ok(r))
    },
    'delete_answer': (req, res) => {
        let p = req.allParams()
        let id = p.id
        delete p.id

        if (!id) return res.err("Require ID")

        async.waterfall([
            (next) => {
                QuickAnswer
                    .destroy({ id })
                    .exec((e, r) => {
                        next(e, r)
                    })
            }
        ], (e, r) => (e) ? res.err(e) : res.ok(r))
    }
};

