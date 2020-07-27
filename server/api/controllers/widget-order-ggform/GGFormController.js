/**
 * NameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const request = require('request')

module.exports = {
    'ping': (req, res) => {
        res.ok('ping')
    },
    'get-html': (req, res) => {
        let p = req.allParams()

        let options = {
            method: 'GET',
            url: p.url_ggform,
        }
        const CB = (e, r, body) => {
            if (!e && r.statusCode == 200) {
                return res.ok(r)
            }
            res.err(e)
        }
        request(options, CB)
    }

};

