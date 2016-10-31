const config = require('../../../knexfile').extweb
const knex = require('knex')(config)

// TODO test
module.exports = function (claimId) {
  return knex('Claim')
    .join('Eligibility', 'Claim.Reference', '=', 'Eligibility.Reference')
    .join('Visitor', 'Eligibility.Reference', '=', 'Visitor.Reference')
    .join('Prisoner', 'Eligibility.Reference', '=', 'Prisoner.Reference')
    .where('Claim.ClaimId', claimId)
    .first('Eligibility.Reference', 'Claim.DateSubmitted', 'Claim.DateOfJourney', 'Visitor.FirstName', 'Visitor.LastName',
      'Visitor.DateOfBirth', 'Visitor.NationalInsuranceNumber', 'Visitor.HouseNumberAndStreet', 'Visitor.Town', 'Visitor.County', 'Visitor.PostCode',
      'Visitor.EmailAddress', 'Visitor.PhoneNumber', 'Visitor.Relationship', 'Prisoner.FirstName AS PrisonerFirstName', 'Prisoner.LastName AS PrisonerLastName',
      'Prisoner.DateOfBirth AS PrisonerDateOfBirth', 'Prisoner.PrisonNumber', 'Prisoner.NameOfPrison')
    .then(function (claim) {
      return knex('Claim')
        .join('ClaimExpense', 'Claim.ClaimId', '=', 'ClaimExpense.ClaimId')
        .where({'Claim.ClaimId': claimId, 'ClaimExpense.IsEnabled': true})
        .select('ClaimExpense.ClaimExpenseId', 'ClaimExpense.ExpenseType', 'ClaimExpense.Cost', 'ClaimExpense.To', 'ClaimExpense.From', 'ClaimExpense.IsReturn', 'ClaimExpense.TravelTime',
          'ClaimExpense.DurationOfTravel', 'ClaimExpense.TicketType')
        .orderBy('ClaimExpense.ClaimExpenseId')
        .then(function (claimExpenses) {
          return {claim: claim, claimExpenses: claimExpenses}
        })
    })
}
