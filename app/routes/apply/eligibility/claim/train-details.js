const UrlPathValidator = require('../../../../services/validators/url-path-validator')
const referenceIdHelper = require('../../../helpers/reference-id-helper')
const ValidationError = require('../../../../services/errors/validation-error')
const expenseUrlRouter = require('../../../../services/routing/expenses-url-router')
const TrainExpense = require('../../../../services/domain/expenses/train-expense')
const insertExpense = require('../../../../services/data/insert-expense')
const getExpenseOwnerData = require('../../../../services/data/get-expense-owner-data')

module.exports = function (router) {
  router.get('/apply/:claimType/eligibility/:referenceId/claim/:claimId/train', function (req, res) {
    UrlPathValidator(req.params)

    // TODO: Query here to determine if this is an advance claim.
    var referenceAndEligibilityId = referenceIdHelper.extractReferenceId(req.params.referenceId)
    return getExpenseOwnerData(req.params.claimId, referenceAndEligibilityId.id, referenceAndEligibilityId.reference)
      .then(function (expenseOwnerData) {
        return res.render('apply/eligibility/claim/train-details', {
          claimType: req.params.claimType,
          referenceId: req.params.referenceId,
          claimId: req.params.claimId,
          expenseOwners: expenseOwnerData,
          params: expenseUrlRouter.parseParams(req.query)
          // TODO: Pass the isAdvanceClaim value to the page for it's boolean check and so we can pass it onto the post.
        })
      })
  })

  // TODO: Pass a query parameter here to indicate that this is an advance claim. That way we only do the database call once on page load.
  router.post('/apply/:claimType/eligibility/:referenceId/claim/:claimId/train', function (req, res, next) {
    UrlPathValidator(req.params)
    var referenceAndEligibilityId = referenceIdHelper.extractReferenceId(req.params.referenceId)

    try {
      var expense = new TrainExpense(
        req.body.cost,
        req.body.from,
        req.body.to,
        req.body['return-journey'],
        req.body['ticket-owner'],
        req.body['departure-time'],
        true // TODO: Need to determine if the claim is advance or not and pass the value.
      )

      insertExpense(referenceAndEligibilityId.reference, referenceAndEligibilityId.id, req.params.claimId, expense)
        .then(function () {
          return res.redirect(expenseUrlRouter.getRedirectUrl(req))
        })
        .catch(function (error) {
          next(error)
        })
    } catch (error) {
      if (error instanceof ValidationError) {
        return getExpenseOwnerData(req.params.claimId, referenceAndEligibilityId.id, referenceAndEligibilityId.reference)
          .then(function (expenseOwnerData) {
            return res.status(400).render('apply/eligibility/claim/train-details', {
              errors: error.validationErrors,
              claimType: req.params.claimType,
              referenceId: req.params.referenceId,
              claimId: req.params.claimId,
              expenseOwners: expenseOwnerData,
              params: expenseUrlRouter.parseParams(req.query),
              expense: req.body
            })
          })
      } else {
        throw error
      }
    }
  })
}
