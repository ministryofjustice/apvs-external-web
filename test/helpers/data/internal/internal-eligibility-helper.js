const config = require('../../../../knexfile').migrations
const knex = require('knex')(config)
const claimHelper = require('./internal-claim-helper')
const eligiblityStatusEnum = require('../../../../app/constants/eligibility-status-enum')
const dateFormatter = require('../../../../app/services/date-formatter')

module.exports.ELIGIBILITY_ID = Math.floor(Date.now() / 100) - 14000000000
module.exports.DATE_CREATED = dateFormatter.now()
module.exports.DATE_SUBMITTED = dateFormatter.now()
module.exports.STATUS = eligiblityStatusEnum.IN_PROGRESS

module.exports.insert = function (reference) {
  return knex('IntSchema.Eligibility')
    .insert({
      EligibilityId: this.ELIGIBILITY_ID,
      Reference: reference,
      DateCreated: this.DATE_CREATED.toDate(),
      DateSubmitted: this.DATE_SUBMITTED.toDate(),
      Status: this.STATUS
    })
    .returning('EligibilityId')
    .then(function (insertedIds) {
      return insertedIds[0]
    })
}

module.exports.insertEligibilityAndClaim = function (reference) {
  var eligibilityId

  return this.insert(reference)
    .then(function (newEligibilityId) {
      eligibilityId = newEligibilityId
      return claimHelper.insert(reference, newEligibilityId)
    })
    .then(function (newClaimId) {
      return { eligibilityId: eligibilityId, claimId: newClaimId }
    })
}

module.exports.get = function (reference) {
  return knex.first()
    .from('IntSchema.Eligibility')
    .where('Reference', reference)
}

module.exports.delete = function (reference) {
  return deleteByReference('IntSchema.Eligibility', reference)
}

function deleteByReference (schemaTable, reference) {
  return knex(schemaTable).where('Reference', reference).del()
}

module.exports.deleteAll = function (reference) {
  return deleteByReference('IntSchema.Claim', reference)
    .then(function () { return deleteByReference('IntSchema.Eligibility', reference) })
}
