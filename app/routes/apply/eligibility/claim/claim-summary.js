const UrlPathValidator = require('../../../../services/validators/url-path-validator')
const getClaimSummary = require('../../../../services/data/get-claim-summary')
const claimSummaryHelper = require('../../../helpers/claim-summary-helper')
const dateHelper = require('../../../../views/helpers/date-helper')
const claimExpenseHelper = require('../../../../views/helpers/claim-expense-helper')
const ClaimSummary = require('../../../../services/domain/claim-summary')
const ValidationError = require('../../../../services/errors/validation-error')
const benefitUploadNotRequired = require('../../../helpers/benefit-upload-not-required')
const displayHelper = require('../../../../views/helpers/display-helper')

const REFERENCE_SESSION_ERROR = '?error=expired'

module.exports = function (router) {
  router.get('/apply/eligibility/claim/summary', function (req, res, next) {
    UrlPathValidator(req.params)

    if (!req.session ||
        !req.session.claimType ||
        !req.session.referenceId ||
        !req.session.decryptedRef ||
        !req.session.advanceOrPast ||
        !req.session.claimId) {
      return res.redirect(`/apply/first-time/new-eligibility/date-of-birth${REFERENCE_SESSION_ERROR}`)
    }

    getClaimSummary(req.session.claimId, req.session.claimType)
      .then(function (claimDetails) {
        return res.render('apply/eligibility/claim/claim-summary',
          {
            claimType: req.session.claimType,
            referenceId: req.session.referenceId,
            claimId: req.session.claimId,
            claimDetails: claimDetails,
            dateHelper: dateHelper,
            claimExpenseHelper: claimExpenseHelper,
            displayHelper: displayHelper,
            benefitUploadNotRequired: benefitUploadNotRequired(req.session.claimType),
            URL: req.url
          })
      })
      .catch(function (error) {
        next(error)
      })
  })

  router.post('/apply/eligibility/claim/summary', function (req, res, next) {
    UrlPathValidator(req.params)

    if (!req.session ||
        !req.session.claimType ||
        !req.session.referenceId ||
        !req.session.decryptedRef ||
        !req.session.advanceOrPast ||
        !req.session.claimId) {
      return res.redirect(`/apply/first-time/new-eligibility/date-of-birth${REFERENCE_SESSION_ERROR}`)
    }

    var referenceId = req.session.referenceId
    var claimId = req.session.claimId
    var claimType = req.session.claimType

    var savedClaimDetails
    getClaimSummary(req.session.claimId, req.session.claimType)
      .then(function (claimDetails) {
        savedClaimDetails = claimDetails

        var visitConfirmation = claimDetails.claim.visitConfirmation
        var benefit = claimDetails.claim.Benefit
        var benefitDocument = claimSummaryHelper.getBenefitDocument(claimDetails.claim.benefitDocument)
        var claimExpenses = claimDetails.claimExpenses
        var isAdvanceClaim = claimDetails.claim.IsAdvanceClaim
        var benefitUpload = benefitUploadNotRequired(claimType)

        new ClaimSummary(visitConfirmation, benefit, benefitDocument, claimExpenses, isAdvanceClaim, benefitUpload) // eslint-disable-line no-new
        return res.redirect(`/apply/eligibility/claim/payment-details?isAdvance=${isAdvanceClaim}`)
      })
      .catch(function (error) {
        if (error instanceof ValidationError) {
          return res.status(400).render('apply/eligibility/claim/claim-summary', {
            errors: error.validationErrors,
            claimType: claimType,
            referenceId: referenceId,
            claimId: claimId,
            claimDetails: savedClaimDetails,
            dateHelper: dateHelper,
            claimExpenseHelper: claimExpenseHelper,
            displayHelper: displayHelper,
            benefitUploadNotRequired: benefitUploadNotRequired(claimType),
            URL: req.url
          })
        } else {
          next(error)
        }
      })
  })

  router.get('/apply/eligibility/:referenceId/claim/summary/view-document/:claimDocumentId', function (req, res, next) {
    UrlPathValidator(req.params)

    return claimSummaryHelper.getDocumentFilePath(req.params.claimDocumentId)
      .then(function (file) {
        return res.download(file.path, file.name)
      })
      .catch(function (error) {
        next(error)
      })
  })

  router.post('/apply/eligibility/claim/summary/remove-expense/:claimExpenseId', function (req, res, next) {
    UrlPathValidator(req.params)

    return claimSummaryHelper.removeExpenseAndDocument(req.session.claimId, req.params.claimExpenseId, req.query.claimDocumentId)
      .then(function () {
        return res.redirect(claimSummaryHelper.buildClaimSummaryUrl(req))
      })
      .catch(function (error) {
        next(error)
      })
  })

  router.post('/apply/eligibility/claim/summary/remove-document/:claimDocumentId', function (req, res, next) {
    UrlPathValidator(req.params)

    return claimSummaryHelper.removeDocument(req.params.claimDocumentId)
      .then(function () {
        return res.redirect(claimSummaryHelper.buildRemoveDocumentUrl(req))
      })
      .catch(function (error) {
        next(error)
      })
  })
}
