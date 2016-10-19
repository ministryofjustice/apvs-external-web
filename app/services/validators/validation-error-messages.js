module.exports = {
  getIsRequired: function (displayName) { return `${displayName} is required` },
  getRadioQuestionIsRequired: function (displayName) { return `Select a ${displayName}` },
  getIsAlpha: function (displayName) { return `${displayName} must only contain letters` },
  getIsNumeric: function (displayName) { return `${displayName} must only contain numbers` },
  getIsLengthMessage: function (displayName, options) { return `${displayName} must be ${options.length} characters in length as shown in the example` },
  getIsLessThanLengthMessage: function (displayName, options) { return `${displayName} must be less than ${options.length} characters in length` },
  getInvalidDobFormatMessage: function (displayName) { return `${displayName} was invalid` },
  getFutureDobMessage: function (displayName) { return `${displayName} must be in the past` }
}
