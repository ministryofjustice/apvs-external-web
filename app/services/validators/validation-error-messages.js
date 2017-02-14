module.exports = {
  getIsRequired: function (displayName) { return `${displayName} is required` },
  getRadioQuestionIsRequired: function (displayName) { return `Select a ${displayName}` },
  getIsAlpha: function (displayName) { return `${displayName} must only contain letters` },
  getIsNumeric: function (displayName) { return `${displayName} must only contain numbers` },
  getIsLengthMessage: function (displayName, options) { return `${displayName} must be ${options.length} characters in length` },
  getIsRangeMessage: function (displayName, options) { return `${displayName} must be between ${options.min} and ${options.max} characters in length` },
  getIsLessThanLengthMessage: function (displayName, options) { return `${displayName} must be less than ${options.length} characters in length` },
  getInvalidDateFormatMessage: function (displayName) { return `${displayName} was invalid` },
  getFutureDateMessage: function (displayName) { return `${displayName} must be in the future` },
  getPastDateMessage: function (displayName) { return `${displayName} must be in the past` },
  getIsValidFormat: function (displayName) { return `${displayName} must have valid format` },
  getIsCurrency: function (displayName) { return `${displayName} must be a valid amount` },
  getIsGreaterThan: function (displayName) { return `${displayName} must be greater than zero` },
  getDateSetDaysAway: function (displayName, options) { return `${displayName} must be within ${options.days} days` },
  getNotDateSetDaysAway: function (displayName, options) { return `${displayName} must not be within ${options.days} days` },
  getIsYoungerThan: function (displayName, options) { return `Must be under ${options.years} years of age` },
  getIsOlderThan: function (displayName, options) { return `Must be over ${options.years} years of age` },
  getIsValidOption: function (displayName) { return `${displayName} must be a valid option` },
  getUploadTooLarge: 'File uploaded too large',
  getUploadIncorrectType: 'File uploaded was not an image or pdf',
  getUploadFileAndAlternativeSelected: 'Both file uploaded and alternative option selected',
  getInvalidReferenceNumberAndDob: 'Could not find any claims for these details',
  getMadeClaimForPrisonerBeforeIsRequired: 'You must confirm if you have made a claim before',
  getNoUpdatesMade: 'No updates were made, please ensure all documents are uploaded for your application to be processed or send a message to your caseworker. Otherwise press cancel to return to your claims',
  getInvalidReference: 'Reference is invalid',
  getMalwareDetected: 'We have detected a virus in this file and can not accept it. Please upload a virus free version.',
  getNoExpensesClaimedFor: function () { return 'All expenses were removed, add an expense to continue' },
  getEnterYourDateOfBirth: function () { return 'Enter your date of birth' },
  getEnterPrisonerFirstName: function () { return 'Enter the prisoner\'s first name' },
  getBenefitRequired: function () { return 'Choose a benefit from the list' }
}
