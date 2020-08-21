/**
 * NameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const request = require('request')
const haravan_province = require('./../../../public/file/haravan_province.json')
const haravan_district = require('./../../../public/file/haravan_districts.json')
const haravan_wards = require('./../../../public/file/haravan_wards.json')

module.exports = {
    'ping': (req, res) => {
        res.ok('ping')
    },
    'provinces': (req, res) => {
        return res.ok(haravan_province.provinces)
    },
    'districts': (req, res) => {
        let p = req.allParams()

        if(!p.province_id) return res.err("Require province_id")
        let districts = haravan_district.districts
        let result = districts.filter(item => {
            return item.province_id === Number(p.province_id)
        })
        return res.ok(result)
    },
    'wards': (req, res) => {
        let p = req.allParams()

        if(!p.district_code) return res.err("Require district_code")

        let wards = haravan_wards.wards

        let result = wards.filter(item => {
            return item.district_code === p.district_code
        })

        return res.ok(result)
    }
    

};

