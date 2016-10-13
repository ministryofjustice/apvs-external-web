var FieldValidator = require('./field-validator')

class PrisonerRelationshipValidator {
  validate (data) {
    var errors = {}

    var relationship = data['relationship']
    var closeRelative = data['close-relative-relationship']
    var escorting = data['escorting']
    var otherRelationship = data['other-relationship']

    FieldValidator(relationship, 'relationship', errors)
      .isRequired()

    if (relationship === 'CloseRelative') {
      FieldValidator(closeRelative, 'close-relative-relationship', errors)
        .isRequired()
    }else if (relationship === 'Escort') {
      FieldValidator(escorting, 'escorting', errors)
        .isRequired()
    }else if (relationship === 'NoneOfTheAbove') {
      FieldValidator(otherRelationship, 'other-relationship', errors)
        .isRequired()
    }

    for (var field in errors) {
      if (errors.hasOwnProperty(field)) {
        if (errors[field].length > 0) {return errors}
      }
    }
    return false
  }
}
exports.default = function (data) {
  return new PrisonerRelationshipValidator().validate(data)
}
module.exports = exports['default']
