const moment = require('moment')
const DATE_FORMAT = 'YYYY-MM-DD'
const DATE_ENCODE_FORMAT = 'YYYYMMDD'
const INVALID_DATE_ERROR = 'Invalid date'
const bases = require('bases')

exports.format = function (date) {
  if (!isDate(date) || isUndefined(date) || isNull(date)) {
    return INVALID_DATE_ERROR
  }
  return date.format(DATE_FORMAT)
}

exports.now = function () {
  var now = moment()
  return applyDST(now)
}

exports.build = function (day, month, year) {
  month = month - 1
  var date = moment([year, month, day])
  return applyDST(date)
}

exports.buildFormatted = function (day, month, year) {
  var date = this.build(day, month, year)
  if (!isValidDate(date)) {
    return INVALID_DATE_ERROR
  }
  return this.format(date)
}

exports.buildFromDateString = function (date) {
  if (typeof date !== 'string') {
    return false
  }
  var dateSplit = date.split('-')
  var year = dateSplit[0]
  var month = dateSplit[1]
  var day = dateSplit[2]

  return this.build(day, month, year)
}

exports.encodeDate = function (date) {
  return bases.toBase8(date.format(DATE_ENCODE_FORMAT))
}

exports.decodeDate = function (encodedDate) {
  var date = moment(bases.fromBase(encodedDate, 8), DATE_ENCODE_FORMAT)
  var formattedDate = this.format(date)
  return formattedDate
}

function applyDST (date) {
  if (date.isDST()) {
    date = date.add(1, 'hour')
  }
  return date
}

function isUndefined (date) {
  return typeof date === 'undefined'
}

function isNull (date) {
  return date === null
}

function isDate (date) {
  return date instanceof moment
}

function isValidDate (date) {
  return date.isValid()
}
