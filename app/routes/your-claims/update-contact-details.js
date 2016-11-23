const UrlPathValidator = require('../../services/validators/url-path-validator')
const UpdatedContactDetails = require('../../services/domain/updated-contact-details')
const ValidationError = require('../../services/errors/validation-error')
const insertEligibilityVisitorUpdatedContactDetail = require('../../services/data/insert-eligibility-visitor-updated-contact-detail')

module.exports = function (router) {
  router.get('/your-claims/:dob/:reference/update-contact-details', function (req, res) {
    UrlPathValidator(req.params)
    return res.render('your-claims/update-contact-details', {
      dob: req.params.dob,
      reference: req.params.reference,
      eligibilityId: req.query.eligibility
    })
  })

  router.post('/your-claims/:dob/:reference/update-contact-details', function (req, res, next) {
    UrlPathValidator(req.params)

    try {
      var updatedContactDetails = new UpdatedContactDetails(req.body['email-address'], req.body['phone-number'])
      insertEligibilityVisitorUpdatedContactDetail(req.params.reference, req.body.EligibilityId, updatedContactDetails)
        .then(function () {
          res.redirect(`/your-claims/${req.params.dob}/${req.params.reference}/check-your-information`)
        })
        .catch(function (error) {
          next(error)
        })
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).render('your-claims/update-contact-details', {
          errors: error.validationErrors,
          dob: req.params.dob,
          reference: req.params.reference,
          eligibilityId: req.body.EligibilityId
        })
      } else {
        throw error
      }
    }
  })
}
