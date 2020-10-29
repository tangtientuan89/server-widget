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
    'create_info': (req, res) => {
        let p = req.allParams()
        if (!p.name) return res.err("Require name");
        if (!p.phone) return res.err("Require phone");

        async.waterfall([
            (next) => {
                KolWeb
                    .create({
                        name: p.name,
                        phone: p.phone,
                        email: p.email,
                        note: p.note
                    })
                    .fetch()
                    .exec((e, r) => {
                        next(e, r)
                    })
            }
        ], (e, r) => (e) ? res.err(e) : res.ok(r))
    },
    'read_info': (req, res) => {
        let p = req.allParams()

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
                    KolWeb
                        .find({
                            ...p,
                            ...{
                                or: [
                                    {
                                        name: {
                                            contains: search
                                        }
                                    },
                                    {
                                        phone: {
                                            contains: search
                                        }
                                    },
                                    {
                                        email: {
                                            contains: search
                                        }
                                    },
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
                    KolWeb
                        .findOne(id)
                        .exec((e, r) => (e) ? next(e) : next(null, r))
                    return
                }
                KolWeb
                    .find(p)
                    .skip(skip)
                    .limit(limit)
                    .sort(sort)
                    .exec((e, r) => (e) ? next(e) : next(null, r))

            }
        ], (e, r) => (e) ? res.err(e) : res.ok(r))
    }
};

