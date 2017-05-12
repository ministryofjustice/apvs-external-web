const Benefits = require('../../../services/domain/benefits')
const UrlPathValidator = require('../../../services/validators/url-path-validator')
const ValidationError = require('../../../services/errors/validation-error')

const REFERENCE_SESSION_ERROR = '?error=expired'

module.exports = function (router) {
  router.get('/apply/:claimType/new-eligibility/benefits', function (req, res) {
    UrlPathValidator(req.params)

    if (!req.session ||
        !req.session.dobEncoded ||
        !req.session.relationship) {
      return res.redirect(`/apply/first-time/new-eligibility/date-of-birth${REFERENCE_SESSION_ERROR}`)
    }

    return res.render('apply/new-eligibility/benefits', {
      URL: req.url
    })
  })

  router.post('/apply/:claimType/new-eligibility/benefits', function (req, res) {
    UrlPathValidator(req.params)

    if (!req.session ||
        !req.session.dobEncoded ||
        !req.session.relationship) {
      return res.redirect(`/apply/first-time/new-eligibility/date-of-birth${REFERENCE_SESSION_ERROR}`)
    }

    try {
      var benefits = new Benefits(req.body.benefit)

      var benefit = benefits.benefit
      req.session.benefit = req.body.benefit

      if (benefit === 'none') {
        return res.redirect('/eligibility-fail')
      } else {
        return res.redirect(`/apply/${req.params.claimType}/new-eligibility/about-the-prisoner`)
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).render('apply/new-eligibility/benefits', {
          errors: error.validationErrors,
          URL: req.url
        })
      } else {
        throw error
      }
    }
  })
}
