const UrlPathValidator = require('../../../../services/validators/url-path-validator')
const referenceIdHelper = require('../../../helpers/reference-id-helper')
const ValidationError = require('../../../../services/errors/validation-error')
const SameJourneyAsLastClaim = require('../../../../services/domain/same-journey-as-last-claim')
const getLastClaimDetails = require('../../../../services/data/get-last-claim-details')

module.exports = function (router) {
  router.get('/apply/repeat/eligibility/:referenceId/new-claim/same-journey-as-last-claim', function (req, res, next) {
    UrlPathValidator(req.params)
    var referenceAndEligibilityId = referenceIdHelper.extractReferenceId(req.params.referenceId)

    getLastClaimDetails(referenceAndEligibilityId.reference, referenceAndEligibilityId.id)
      .then(function (lastClaimDetails) {
        return res.render('apply/eligibility/new-claim/same-journey-as-last-claim', {
          referenceId: req.params.referenceId,
          lastClaimDetails: lastClaimDetails
        })
      })
      .catch(function (error) {
        next(error)
      })
  })

  router.post('/apply/repeat/eligibility/:referenceId/new-claim/same-journey-as-last-claim', function (req, res, next) {
    UrlPathValidator(req.params)
    var referenceAndEligibilityId = referenceIdHelper.extractReferenceId(req.params.referenceId)

    try {
      new SameJourneyAsLastClaim(req.body['same-journey-as-last-claim']) // eslint-disable-line no-new

      var claimType = 'repeat'
      if (req.body['same-journey-as-last-claim'] === 'yes') {
        claimType = 'repeat-duplicate'
      }
      return res.redirect(`/apply/${claimType}/eligibility/${req.params.referenceId}/new-claim/past`)
    } catch (error) {
      if (error instanceof ValidationError) {
        getLastClaimDetails(referenceAndEligibilityId.reference, referenceAndEligibilityId.id)
          .then(function (lastClaimDetails) {
            return res.status(400).render('apply/eligibility/new-claim/same-journey-as-last-claim', {
              errors: error.validationErrors,
              referenceId: req.params.referenceId,
              lastClaimDetails: lastClaimDetails
            })
          })
          .catch(function (error) {
            next(error)
          })
      } else {
        throw error
      }
    }
  })
}
