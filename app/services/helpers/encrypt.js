const crypto = require('crypto')
const config = require('../../../config')

var algorithm = 'aes-256-ctr'

module.exports = function (value) {
  var cipher = crypto.createCipher(algorithm, config.EXT_REFERENCE_SALT)
  var crypted = cipher.update(value, 'utf8', 'hex')
  crypted += cipher.final('hex')

  return crypted
}
