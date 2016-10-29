const Promise = require('bluebird')
const config = require('../../../knexfile').extweb
const knex = require('knex')(config)
const moment = require('moment')
const insertTaskCompleteFirstTimeClaim = require('./insert-task-complete-first-time-claim')
const insertTaskSendFirstTimeClaimNotification = require('./insert-task-send-first-time-claim-notification')
const eligibilityStatusEnum = require('../../constants/eligibility-status-enum')
const claimStatusEnum = require('../../constants/claim-status-enum')

module.exports = function (reference, claimId) {
  var dateSubmitted = moment().toDate()

  return Promise.all([updateEligibility(reference, dateSubmitted),
                      updateClaim(claimId, dateSubmitted),
                      insertTaskCompleteFirstTimeClaim(reference, claimId),
                      insertTaskSendFirstTimeClaimNotification(reference, claimId)])
}

function updateEligibility (reference, dateSubmitted) {
  return knex('Eligibility').where('Reference', reference).update({
    'Status': eligibilityStatusEnum.SUBMITTED,
    'DateSubmitted': dateSubmitted
  })
}

function updateClaim (claimId, dateSubmitted) {
  return knex('Claim').where('ClaimId', claimId).update({
    'Status': claimStatusEnum.SUBMITTED,
    'DateSubmitted': dateSubmitted
  })
}
