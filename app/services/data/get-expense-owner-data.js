const config = require('../../../knexfile').extweb
const knex = require('knex')(config)

module.exports = function (claimId, eligibilityId, reference) {
  const result = {}
  return getAnyClaimChildren(claimId, eligibilityId, reference)
    .then(function (child) {
      result.child = child.length !== 0
      return getAnyClaimEscorts(claimId, eligibilityId, reference)
    })
    .then(function (escort) {
      result.escort = escort.length !== 0
      return getAnyEligibleChildren(eligibilityId, reference)
        .then(function (eligibleChildren) {
          result.eligibleChildren = eligibleChildren.length !== 0
          return result
        })
    })
}

function getAnyClaimChildren (claimId, eligibilityId, reference) {
  return knex('ClaimChild')
    .where({
      ClaimId: claimId,
      EligibilityId: eligibilityId,
      Reference: reference,
      IsEnabled: true
    })
    .select('ClaimChildId')
}

function getAnyClaimEscorts (claimId, eligibilityId, reference) {
  return knex('ClaimEscort')
    .where({
      ClaimId: claimId,
      EligibilityId: eligibilityId,
      Reference: reference,
      IsEnabled: true
    })
    .select('ClaimEscortId')
}

function getAnyEligibleChildren (eligibilityId, reference) {
  return knex.raw('SELECT * FROM [IntSchema].[getEligibleChildren] (?, ?)', [reference, eligibilityId])
}
