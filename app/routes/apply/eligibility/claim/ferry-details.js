const UrlPathValidator = require('../../../../services/validators/url-path-validator')
const referenceIdHelper = require('../../../helpers/reference-id-helper')
const ValidationError = require('../../../../services/errors/validation-error')
const expenseUrlRouter = require('../../../../services/routing/expenses-url-router')
const FerryExpense = require('../../../../services/domain/expenses/ferry-expense')
const insertExpense = require('../../../../services/data/insert-expense')
const getExpenseOwnerData = require('../../../../services/data/get-expense-owner-data')
const isAdvanceClaim = require('../../../../services/data/is-advance-claim')

module.exports = function (router) {
  router.get('/apply/:claimType/eligibility/:referenceId/claim/:claimId/ferry', function (req, res) {
    UrlPathValidator(req.params)

    var referenceAndEligibilityId = referenceIdHelper.extractReferenceId(req.params.referenceId)
    isAdvanceClaim(req.params.claimId)
      .then(function (isAdvanceClaim) {
        return getExpenseOwnerData(req.params.claimId, referenceAndEligibilityId.id, referenceAndEligibilityId.reference)
          .then(function (expenseOwnerData) {
            return res.render('apply/eligibility/claim/ferry-details', {
              claimType: req.params.claimType,
              referenceId: req.params.referenceId,
              claimId: req.params.claimId,
              expenseOwners: expenseOwnerData,
              params: expenseUrlRouter.parseParams(req.query),
              redirectUrl: expenseUrlRouter.getRedirectUrl(req),
              isAdvanceClaim: isAdvanceClaim.IsAdvanceClaim
            })
          })
      })
  })

  router.post('/apply/:claimType/eligibility/:referenceId/claim/:claimId/ferry', function (req, res, next) {
    UrlPathValidator(req.params)
    var referenceAndEligibilityId = referenceIdHelper.extractReferenceId(req.params.referenceId)

    try {
      var expense = new FerryExpense(
        req.body.cost,
        req.body.from,
        req.body.to,
        req.body['return-journey'],
        req.body['ticket-type'],
        req.body['ticket-owner']
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
        isAdvanceClaim(req.params.claimId)
          .then(function (isAdvanceClaim) {
            return getExpenseOwnerData(req.params.claimId, referenceAndEligibilityId.id, referenceAndEligibilityId.reference)
              .then(function (expenseOwnerData) {
                return res.status(400).render('apply/eligibility/claim/ferry-details', {
                  errors: error.validationErrors,
                  claimType: req.params.claimType,
                  referenceId: req.params.referenceId,
                  claimId: req.params.claimId,
                  expenseOwners: expenseOwnerData,
                  params: expenseUrlRouter.parseParams(req.query),
                  redirectUrl: expenseUrlRouter.getRedirectUrl(req),
                  expense: req.body,
                  isAdvanceClaim: isAdvanceClaim.IsAdvanceClaim
                })
              })
          })
      } else {
        throw error
      }
    }
  })
}
