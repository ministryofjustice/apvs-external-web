const UrlPathValidator = require('../../services/validators/url-path-validator')
const getViewClaim = require('../../services/data/get-view-claim')
const displayHelper = require('../../views/helpers/display-helper')
const dateHelper = require('../../views/helpers/date-helper')
const claimExpenseHelper = require('../../views/helpers/claim-expense-helper')
const referenceIdHelper = require('../helpers/reference-id-helper')
const ViewClaim = require('../../services/domain/view-claim')
const ValidationError = require('../../services/errors/validation-error')
const getClaimDocumentFilePath = require('../../services/data/get-claim-document-file-path')
const removeClaimDocument = require('../../services/data/remove-claim-document')
const submitUpdate = require('../../services/data/submit-update')

module.exports = function (router) {
  router.get('/your-claims/:dob/:reference/:claimId', function (req, res, next) {
    UrlPathValidator(req.params)
    getViewClaim(req.params.claimId, req.params.reference, req.params.dob)
      .then(function (claimDetails) {
        var referenceId = referenceIdHelper.getReferenceId(req.params.reference, claimDetails.claim.EligibilityId)
        return res.render('your-claims/view-claim',
          {
            reference: req.params.reference,
            referenceId: referenceId,
            dob: req.params.dob,
            claimId: req.params.claimId,
            claimDetails: claimDetails,
            dateHelper: dateHelper,
            claimExpenseHelper: claimExpenseHelper,
            displayHelper: displayHelper,
            URL: req.url
          })
      })
  })

  router.post('/your-claims/:dob/:reference/:claimId', function (req, res, next) {
    UrlPathValidator(req.params)
    getViewClaim(req.params.claimId, req.params.reference, req.params.dob, req.body['message-to-caseworker'])
      .then(function (claimDetails) {
        try {
          var benefit = claimDetails.claim.benefitDocument
          if (benefit.length <= 0) {
            benefit.push({fromInternalWeb: true})
          }
          var claim = new ViewClaim(claimDetails.claim.visitConfirmation.fromInternalWeb, benefit[0].fromInternalWeb, claimDetails.claimExpenses) // eslint-disable-line no-unused-vars
          submitUpdate(req.params.reference, claimDetails.claim.EligibilityId, req.params.claimId, req.body['message-to-caseworker'])
            .then(function () {
              return res.redirect(`/application-updated/${req.params.reference}`)
            })
        } catch (error) {
          if (error instanceof ValidationError) {
            var referenceId = referenceIdHelper.getReferenceId(req.params.reference, claimDetails.claim.EligibilityId)
            return res.status(400).render('your-claims/view-claim', {
              errors: error.validationErrors,
              reference: req.params.reference,
              referenceId: referenceId,
              claimId: req.params.claimId,
              claimDetails: claimDetails,
              dateHelper: dateHelper,
              claimExpenseHelper: claimExpenseHelper,
              displayHelper: displayHelper,
              URL: req.url
            })
          } else {
            next(error)
          }
        }
      })
  })

  router.get('/your-claims/:dob/:reference/:claimId/view-document/:claimDocumentId', function (req, res, next) {
    UrlPathValidator(req.params)

    getClaimDocumentFilePath(req.params.claimDocumentId)
      .then(function (result) {
        var path = result.Filepath
        if (path) {
          var fileName = 'APVS-Upload.' + path.split('.').pop()
          return res.download(path, fileName)
        } else {
          throw new Error('No path to file provided')
        }
      })
      .catch(function (error) {
        next(error)
      })
  })

  router.post('/your-claims/:dob/:reference/:claimId/remove-document/:claimDocumentId', function (req, res, next) {
    UrlPathValidator(req.params)

    removeClaimDocument(req.params.claimDocumentId)
      .then(function () {
        if (req.query.multipage) {
          return res.redirect(`/your-claims/${req.params.dob}/${req.params.reference}/${req.params.claimId}`)
        } else {
          if (req.query.claimExpenseId) {
            return res.redirect(`/your-claims/${req.params.dob}/${req.params.reference}/${req.params.claimId}/file-upload?document=${req.query.document}&claimExpenseId=${req.query.claimExpenseId}&eligibilityId=${req.query.eligibilityId}`)
          } else {
            return res.redirect(`/your-claims/${req.params.dob}/${req.params.reference}/${req.params.claimId}/file-upload?document=${req.query.document}&eligibilityId=${req.query.eligibilityId}`)
          }
        }
      })
      .catch(function (error) {
        next(error)
      })
  })
}
