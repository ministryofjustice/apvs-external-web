const AboutEscort = require('../../../../services/domain/about-escort')
const UrlPathValidator = require('../../../../services/validators/url-path-validator')
const referenceIdHelper = require('../../../helpers/reference-id-helper')
const ValidationError = require('../../../../services/errors/validation-error')
const insertEscort = require('../../../../services/data/insert-escort')

const REFERENCE_SESSION_ERROR = '?error=expired'

module.exports = function (router) {
  router.get('/apply/eligibility/claim/about-escort', function (req, res) {
    UrlPathValidator(req.params)

    if (!req.session ||
        !req.session.claimType ||
        !req.session.referenceId ||
        !req.session.decryptedRef ||
        !req.session.advanceOrPast ||
        !req.session.claimId) {
      return res.redirect(`/apply/first-time/new-eligibility/date-of-birth${REFERENCE_SESSION_ERROR}`)
    }

    return res.render('apply/eligibility/claim/about-escort', {
      claimType: req.session.claimType,
      referenceId: req.session.referenceId,
      claimId: req.session.claimId
    })
  })

  router.post('/apply/eligibility/claim/about-escort', function (req, res, next) {
    UrlPathValidator(req.params)
    var referenceAndEligibilityId = referenceIdHelper.extractReferenceId(req.session.referenceId)

    if (!req.session ||
        !req.session.claimType ||
        !req.session.referenceId ||
        !req.session.advanceOrPast ||
        !req.session.claimId) {
      return res.redirect(`/apply/first-time/new-eligibility/date-of-birth${REFERENCE_SESSION_ERROR}`)
    }

    try {
      var escort = new AboutEscort(
        req.body['FirstName'],
        req.body['LastName'],
        req.body['dob-day'],
        req.body['dob-month'],
        req.body['dob-year']
      )

      insertEscort(referenceAndEligibilityId.reference, referenceAndEligibilityId.id, req.session.claimId, escort)
        .then(function () {
          return res.redirect(`/apply/eligibility/claim/has-child`)
        })
        .catch(function (error) {
          next(error)
        })
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).render('apply/eligibility/claim/about-escort', {
          errors: error.validationErrors,
          claimType: req.session.claimType,
          referenceId: req.session.referenceId,
          claimId: req.session.claimId,
          escort: req.body
        })
      } else {
        throw error
      }
    }
  })
}
