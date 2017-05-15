const UrlPathValidator = require('../../../../services/validators/url-path-validator')
const referenceIdHelper = require('../../../helpers/reference-id-helper')
const ValidationError = require('../../../../services/errors/validation-error')
const SameJourneyAsLastClaim = require('../../../../services/domain/same-journey-as-last-claim')
const getLastClaimDetails = require('../../../../services/data/get-last-claim-details')
const claimExpenseHelper = require('../../../../views/helpers/claim-expense-helper')
const displayHelper = require('../../../../views/helpers/display-helper')
const SessionValidator = require('../../../../services/validators/session-validator')

module.exports = function (router) {
  router.get('/apply/eligibility/new-claim/same-journey-as-last-claim', function (req, res, next) {
    UrlPathValidator(req.params)
    var validatorResult = SessionValidator(req.session, req.url)

    if (!validatorResult[0]) {
      return res.redirect(validatorResult[1])
    }

    var referenceAndEligibilityId = referenceIdHelper.extractReferenceId(req.session.referenceId)

    getLastClaimDetails(referenceAndEligibilityId.reference, referenceAndEligibilityId.id, true)
      .then(function (lastClaimDetails) {
        if (lastClaimDetails.expenses[0]) {
          return res.render('apply/eligibility/new-claim/same-journey-as-last-claim', {
            referenceId: req.session.referenceId,
            advanceOrPast: req.session.advanceOrPast,
            lastClaimDetails: lastClaimDetails,
            claimExpenseHelper: claimExpenseHelper,
            displayHelper: displayHelper
          })
        } else {
          return res.redirect(`/apply/eligibility/new-claim/same-journey-as-last-claim`)
        }
      })
      .catch(function (error) {
        next(error)
      })
  })

  router.post('/apply/eligibility/new-claim/same-journey-as-last-claim', function (req, res, next) {
    UrlPathValidator(req.params)
    var validatorResult = SessionValidator(req.session, req.url)

    if (!validatorResult[0]) {
      return res.redirect(validatorResult[1])
    }

    var referenceAndEligibilityId = referenceIdHelper.extractReferenceId(req.session.referenceId)

    try {
      new SameJourneyAsLastClaim(req.body['same-journey-as-last-claim']) // eslint-disable-line no-new

      req.session.claimType = 'repeat'
      if (req.body['same-journey-as-last-claim'] === 'yes') {
        req.session.claimType = 'repeat-duplicate'
      }

      return res.redirect(`/apply/eligibility/new-claim/journey-information`)
    } catch (error) {
      if (error instanceof ValidationError) {
        getLastClaimDetails(referenceAndEligibilityId.reference, referenceAndEligibilityId.id, true)
          .then(function (lastClaimDetails) {
            return res.status(400).render('apply/eligibility/new-claim/same-journey-as-last-claim', {
              errors: error.validationErrors,
              referenceId: req.session.referenceId,
              advanceOrPast: req.session.advanceOrPast,
              lastClaimDetails: lastClaimDetails,
              claimExpenseHelper: claimExpenseHelper,
              displayHelper: displayHelper
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
