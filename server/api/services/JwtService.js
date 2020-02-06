'use strict'
/**
 * @summary service mã hoá jwt token
 */
const jwt_service = {}
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

const secret = sails.config.jwtconfig.secret
const expiresIn = sails.config.jwtconfig.expiresIn

jwt_service.gen_token = (payload) => {
    return jwt.sign(payload, secret, { expiresIn: expiresIn })
}
jwt_service.verify = (token, next) => {
    jwt.verify(token, secret, (e, r) => (e) ? next(e) : next(null, r))
}
jwt_service.get_payload = (token, next) => {
    try {
        let payload = jwt_decode(token)    
        next(null, payload)
    } catch (e) {
        next(e)   
    }
}

module.exports = jwt_service