const UrlPathValidator = require('../../../../services/validators/url-path-validator')
const referenceIdHelper = require('../../../helpers/reference-id-helper')
const ValidationError = require('../../../../services/errors/validation-error')
const expenseUrlRouter = require('../../../../services/routing/expenses-url-router')
const RefreshmentExpense = require('../../../../services/domain/expenses/refreshment-expense')
const insertExpense = require('../../../../services/data/insert-expense')
const getIsAdvanceClaim = require('../../../../services/data/get-is-advance-claim')

module.exports = function (router) {
  router.get('/apply/:claimType/eligibility/:referenceId/claim/:claimId/refreshment', function (req, res) {
    UrlPathValidator(req.params)

    getIsAdvanceClaim(req.params.claimId)
      .then(function (isAdvanceClaim) {
        return res.render('apply/eligibility/claim/light-refreshment-details', {
          claimType: req.params.claimType,
          referenceId: req.params.referenceId,
          claimId: req.params.claimId,
          params: expenseUrlRouter.parseParams(req.query),
          redirectUrl: expenseUrlRouter.getRedirectUrl(req),
          isAdvanceClaim: isAdvanceClaim
        })
      })
  })

  router.post('/apply/:claimType/eligibility/:referenceId/claim/:claimId/refreshment', function (req, res, next) {
    UrlPathValidator(req.params)
    var referenceAndEligibilityId = referenceIdHelper.extractReferenceId(req.params.referenceId)

    try {
      var expense = new RefreshmentExpense(req.body.cost)

      insertExpense(referenceAndEligibilityId.reference, referenceAndEligibilityId.id, req.params.claimId, expense)
        .then(function () {
          return res.redirect(expenseUrlRouter.getRedirectUrl(req))
        })
        .catch(function (error) {
          next(error)
        })
    } catch (error) {
      if (error instanceof ValidationError) {
        getIsAdvanceClaim(req.params.claimId)
          .then(function (isAdvanceClaim) {
            return res.status(400).render('apply/eligibility/claim/light-refreshment-details', {
              errors: error.validationErrors,
              claimType: req.params.claimType,
              referenceId: req.params.referenceId,
              claimId: req.params.claimId,
              params: expenseUrlRouter.parseParams(req.query),
              redirectUrl: expenseUrlRouter.getRedirectUrl(req),
              expense: req.body,
              isAdvanceClaim: isAdvanceClaim
            })
          })
      } else {
        throw error
      }
    }
  })
}
