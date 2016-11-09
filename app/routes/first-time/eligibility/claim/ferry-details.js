const UrlPathValidator = require('../../../../services/validators/url-path-validator')
const ValidationError = require('../../../../services/errors/validation-error')
const expenseUrlRouter = require('../../../../services/routing/expenses-url-router')
const FerryExpense = require('../../../../services/domain/expenses/ferry-expense')
const insertExpense = require('../../../../services/data/insert-expense')

module.exports = function (router) {
  router.get('/first-time/eligibility/:reference/claim/:claimId/ferry', function (req, res) {
    UrlPathValidator(req.params)
    return res.render('first-time/eligibility/claim/ferry-details', {
      reference: req.params.reference,
      claimId: req.params.claimId,
      params: expenseUrlRouter.parseParams(req.query)
    })
  })

  router.post('/first-time/eligibility/:reference/claim/:claimId/ferry', function (req, res, next) {
    UrlPathValidator(req.params)

    try {
      var expense = new FerryExpense(
        req.params.claimId,
        req.body.cost,
        req.body.from,
        req.body.to,
        req.body['return-journey'],
        req.body['ticket-type'],
        req.body['is-child']
      )

      insertExpense(expense)
        .then(function () {
          return res.redirect(expenseUrlRouter.getRedirectUrl(req))
        })
        .catch(function (error) {
          next(error)
        })
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).render('first-time/eligibility/claim/ferry-details', {
          errors: error.validationErrors,
          reference: req.params.reference,
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
