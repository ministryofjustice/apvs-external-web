const ValidationError = require('../errors/validation-error')
const FieldValidator = require('../validators/field-validator')
const FieldsetValidator = require('../validators/fieldset-validator')
const ErrorHandler = require('../validators/error-handler')
const dateFormatter = require('../date-formatter')

class FirstTimeClaim {
  constructor (
    reference,
    day,
    month,
    year
  ) {
    this.reference = reference
    this.dateOfPrisonVisit = dateFormatter.build(day, month, year).toDate()
    this.IsValid()
  }

  IsValid () {
    var errors = ErrorHandler()

    FieldValidator(this.reference, 'Reference', errors)
      .isRequired()

    FieldsetValidator(this.dateOfPrisonVisit, 'DateOfPrisonVisit', errors)
      .isValidDate(this.dateOfPrisonVisit)
      .isPastDate(this.dateOfPrisonVisit)
      .isDateSetDaysAway(this.dateOfPrisonVisit, 28)

    var validationErrors = errors.get()

    if (validationErrors) {
      console.log(validationErrors)
      throw new ValidationError(validationErrors)
    }
  }
}

module.exports = FirstTimeClaim
