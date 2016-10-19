const bases = require('bases')
const REFERENCE_NUMBER_CHARACTERS = require('../constants/reference-number').REFERENCE_NUMBER_CHARACTERS

module.exports.generate = function () {
  var min = 1073741824  // 1000000
  var max = 34359738367 // VVVVVVV
  var random = Math.floor(Math.random() * (max - min) + min)
  // use Base-32 reference http://www.crockford.com/wrmg/base32.html
  return bases.toAlphabet(random, REFERENCE_NUMBER_CHARACTERS)
}
