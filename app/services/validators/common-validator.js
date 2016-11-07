/**
 * This file defines all generic validation tests used in the application. This file can and should be used by the
 * three higher level validators: FieldValidator, FieldSetValidator, and UrlPathValidator.
 */
const validator = require('validator')
const moment = require('moment')
const prisonerRelationshipsEnum = require('../../constants/prisoner-relationships-enum')
const benefitsEnum = require('../../constants/benefits-enum')
const referenceNumber = require('../../constants/reference-number-enum')
const dateFormatter = require('../date-formatter')
const NUM_YEARS_LIMIT = 120

exports.isNullOrUndefined = function (value) {
  return !value
}

exports.isAlpha = function (value) {
  return validator.isAlpha(value)
}

exports.isNumeric = function (value) {
  return validator.isNumeric(value)
}

exports.isLength = function (value, length) {
  return validator.isLength(value, { min: length, max: length })
}

exports.isLessThanLength = function (value, length) {
  return validator.isLength(value, { max: length })
}

exports.isValidDate = function (date) {
  if (this.isNullOrUndefined(date)) {
    return false
  }
  if (date instanceof Date) {
    date = moment(date)
  }
  return date instanceof moment &&
         date.isValid() &&
         dateFormatter.now().diff(date, 'years') < NUM_YEARS_LIMIT
}

exports.isDateInThePast = function (date) {
  return this.isValidDate(date) &&
         moment(date) < dateFormatter.now()
}

exports.isRange = function (value, min, max) {
  return validator.isLength(value, {min: min, max: max})
}

exports.isNationalInsuranceNumber = function (value) {
  return validator.matches(value, '^[A-z]{2}[0-9]{6}[A-z]{1}$')
}

exports.isPostcode = function (value) {
  return validator.matches(value, '^[A-Z]{1,2}[0-9]{1,2}[A-Z]?[0-9]{1}[A-Z]{2}$')
}

exports.isEmail = function (value) {
  return validator.isEmail(value)
}

exports.isCurrency = function (value) {
  return validator.isCurrency(value)
}

exports.isGreaterThanZero = function (value) {
  return value > 0
}

exports.isValidDateOfBirth = function (dob) {
  if (this.isNullOrUndefined(dob)) {
    return false
  }
  if (!(dob instanceof moment)) {
    dob = dateFormatter.buildFromDateString(dob)
  }
  return this.isValidDate(dob) && this.isDateInThePast(dob)
}

exports.isValidPrisonerRelationship = function (relationship) {
  var validPrisonerRelationships = Object.keys(prisonerRelationshipsEnum)
  return validPrisonerRelationships.includes(relationship)
}

exports.isValidBenefitResponse = function (benefit) {
  var validBenefits = Object.keys(benefitsEnum)
  return validBenefits.includes(benefit)
}

exports.isValidReference = function (reference) {
  if (this.isNullOrUndefined(reference)) {
    return false
  }
  return reference.match(referenceNumber.IS_VALID_REGEX) !== null &&
         this.isLength(reference, referenceNumber.VALID_LENGTH)
}
