const UrlPathValidator = require('../../../../services/validators/url-path-validator')
const expenseUrlRouter = require('../../../../services/routing/expenses-url-router')

module.exports = function (router) {
  router.get('/first-time-claim/eligibility/:reference/claim/:claim/bus', function (req, res) {
    return res.render('first-time/eligibility/claim/bus-details', {
      reference: req.params.reference,
      claim: req.params.claim
    })
  })

  router.post('/first-time-claim/eligibility/:reference/claim/:claim/bus', function (req, res) {
    UrlPathValidator(req.params)
    return res.redirect(expenseUrlRouter.getRedirectUrl(req))
  })
}
