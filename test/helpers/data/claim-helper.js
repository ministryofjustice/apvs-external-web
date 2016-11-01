const config = require('../../../knexfile').migrations
const knex = require('knex')(config)
const moment = require('moment')
const insertFirstTimeClaim = require('../../../app/services/data/insert-first-time-claim')
const FirstTimeClaim = require('../../../app/services/domain/first-time-claim')
const claimStatusEnum = require('../../../app/constants/claim-status-enum')
const dateFormatter = require('../../../app/services/date-formatter')

module.exports.DATE_OF_JOURNEY = moment().toDate()
module.exports.DATE_OF_JOURNEY_FORMATTED = dateFormatter.build(
  this.DATE_OF_JOURNEY.getDay(),
  this.DATE_OF_JOURNEY.getMonth(),
  this.DATE_OF_JOURNEY.getFullYear()
)
module.exports.DATE_CREATED = moment().toDate()
module.exports.DATE_SUBMITTED = moment().toDate()
module.exports.STATUS = claimStatusEnum.IN_PROGRESS

module.exports.build = function (reference) {
  return new FirstTimeClaim(
    reference,
    this.DATE_OF_JOURNEY.getDay(),
    this.DATE_OF_JOURNEY.getMonth(),
    this.DATE_OF_JOURNEY.getFullYear()
  )
}

module.exports.insert = function (reference) {
  return insertFirstTimeClaim(this.build(reference))
    .then(function (claimId) {
      module.exports.CLAIM_ID = claimId[0]
    })
}

module.exports.get = function (claimId) {
  return knex.first()
    .from('ExtSchema.Claim')
    .where('ClaimId', claimId)
}

module.exports.delete = function (claimId) {
  return knex('ExtSchema.Claim')
    .where('ClaimId', claimId)
    .del()
}
