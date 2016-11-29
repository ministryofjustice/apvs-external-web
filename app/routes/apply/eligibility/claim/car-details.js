const UrlPathValidator = require('../../../../services/validators/url-path-validator')
const referenceIdHelper = require('../../../helpers/reference-id-helper')
const ValidationError = require('../../../../services/errors/validation-error')
const expenseUrlRouter = require('../../../../services/routing/expenses-url-router')
const CarExpense = require('../../../../services/domain/expenses/car-expense')
const getTravellingFromAndTo = require('../../../../services/data/get-travelling-from-and-to')
const getMaskedEligibility = require('../../../../services/data/get-masked-eligibility')
const insertCarExpenses = require('../../../../services/data/insert-car-expenses')

module.exports = function (router) {
  router.get('/apply/:claimType/eligibility/:referenceId/claim/:claimId/car', function (req, res, next) {
    UrlPathValidator(req.params)
    var referenceAndEligibilityId = referenceIdHelper.extractReferenceId(req.params.referenceId)

    if (req.params.claimType === 'first-time') {
      getTravellingFromAndTo(referenceAndEligibilityId.reference, referenceAndEligibilityId.id)
        .then(function (result) {
          return res.render('apply/eligibility/claim/car-details', {
            claimType: req.params.claimType,
            referenceId: req.params.referenceId,
            claimId: req.params.claimId,
            params: expenseUrlRouter.parseParams(req.query),
            expense: result
          })
        })
        .catch(function (error) {
          next(error)
        })
    } else {
      getMaskedEligibility(referenceAndEligibilityId.reference, null, referenceAndEligibilityId.id)
        .then(function (result) {
          var fromAndTo = {from: result.Town, to: result.NameOfPrison}
          return res.render('apply/eligibility/claim/car-details', {
            claimType: req.params.claimType,
            referenceId: req.params.referenceId,
            claimId: req.params.claimId,
            params: expenseUrlRouter.parseParams(req.query),
            expense: fromAndTo
          })
        })
        .catch(function (error) {
          next(error)
        })
    }
  })

  router.post('/apply/:claimType/eligibility/:referenceId/claim/:claimId/car', function (req, res, next) {
    UrlPathValidator(req.params)
    var referenceAndEligibilityId = referenceIdHelper.extractReferenceId(req.params.referenceId)

    try {
      var expense = new CarExpense(
        req.body.from,
        req.body.to,
        req.body.toll,
        req.body[ 'toll-cost' ],
        req.body[ 'parking-charge' ],
        req.body[ 'parking-charge-cost' ]
      )

      insertCarExpenses(referenceAndEligibilityId.reference, referenceAndEligibilityId.id, req.params.claimId, expense)
        .then(function () {
          return res.redirect(expenseUrlRouter.getRedirectUrl(req))
        })
        .catch(function (error) {
          next(error)
        })
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).render('apply/eligibility/claim/car-details', {
          errors: error.validationErrors,
          claimType: req.params.claimType,
          referenceId: req.params.referenceId,
          claimId: req.params.claimId,
          params: expenseUrlRouter.parseParams(req.query),
          expense: req.body
        })
      } else {
        throw error
      }
    }
  })
}
