'use strict'
/**
 * @summary service mã hoá jwt token
 */
const jwt_service = {}
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

/**
 * @summary Mã hoá data với bí mật
 * 
 * @description 
 * - Không có thơi gian hết hạn
 * - Có thời gian hết hạn
 * 
 * @param {object} payload dữ liệu muốn mã hoá
 * @param {string} secret chìa khoá, không thể được giải mã
 * @param {string} expires_in thời gian hết hạn
 * 
 * @returns string
 */
jwt_service.gen_token = (payload, secret, expires_in) => {
    return (!expires_in)
        ? jwt.sign(payload, secret)
        : jwt.sign(payload, secret, { expiresIn: expires_in })
}
/**
 * @summary Giải mã token bằng bí mật
 * 
 * @param {string} token data được mã hoá
 * @param {string} secret chìa khoá giải mã
 * @param {function} next callback
 * 
 * @callback error, data
 */
jwt_service.verify = (token, secret, next) => {
    jwt.verify(token, secret, (e, r) => (e) ? next(e) : next(null, r))
}
/**
 * @summary Giải mã phần public của token
 * 
 * @param {string} token data được mã hoá
 * @param {function} next callback
 * 
 * @callback error, data
 */
jwt_service.get_payload = (token, next) => {
    try {
        let payload = jwt_decode(token)    
        next(null, payload)
    } catch (e) {
        next(e)   
    }
}

module.exports = jwt_service