const ValidationError = require('../../errors/validation-error')
const FieldValidator = require('../../validators/field-validator')
const ErrorHandler = require('../../validators/error-handler')
const ERROR_MESSAGES = require('../../validators/validation-error-messages')

class Expenses {
  constructor (expense) {
    this.expense = expense
    this.isValid()
  }

  isValid () {
    var errors = ErrorHandler()

    FieldValidator(this.expense, 'expenses', errors)
      .isRequired(ERROR_MESSAGES.getRadioQuestionIsRequired)
      .isValidExpenseArray()

    var validationErrors = errors.get()
    if (validationErrors) {
      throw new ValidationError(validationErrors)
    }
  }
}

module.exports = Expenses
