const UrlPathValidator = require('../../services/validators/url-path-validator')
const getHistoricClaims = require('../../services/data/get-historic-claims')
const dateHelper = require('../../views/helpers/date-helper')
const claimStatusEnum = require('../../constants/claim-status-enum')
const claimStatusHelper = require('../../views/helpers/claim-status-helper')
const dateFormatter = require('../../services/date-formatter')
const displayHelper = require('../../views/helpers/display-helper')

const REFERENCE_DOB_ERROR = '?error=yes'

module.exports = function (router) {
  router.get('/your-claims/:dob/:reference', function (req, res, next) {
    UrlPathValidator(req.params)
    getHistoricClaims(req.params.reference, dateFormatter.buildFromDateString(req.params.dob).toDate())
      .then(function (claims) {
        if (claims.length === 0) {
          return res.redirect(`/start-already-registered${REFERENCE_DOB_ERROR}`)
        }

        var canStartNewClaim = noClaimsInProgress(claims)

        return res.render('your-claims/your-claims', {
          dob: req.params.dob,
          reference: req.params.reference,
          claims: claims,
          dateHelper: dateHelper,
          claimStatusHelper: claimStatusHelper,
          canStartNewClaim: canStartNewClaim,
          displayHelper: displayHelper
        })
      })
      .catch(function (error) {
        next(error)
      })
  })

  function noClaimsInProgress (claims) {
    var result = true

    claims.forEach(function (claim) {
      if (claim.Status !== claimStatusEnum.APPROVED &&
          claim.Status !== claimStatusEnum.REJECTED) {
        result = false
      }
    })

    return result
  }
}
