module.exports = {
  getIsRequired: function (displayName) { return `${displayName} is required` },
  getRadioQuestionIsRequired: function (displayName) { return `Select a ${displayName}` },
  getIsAlpha: function (displayName) { return `${displayName} must only contain letters` },
  getIsNumeric: function (displayName) { return `${displayName} can only contain numbers` },
  getIsLengthMessage: function (displayName, options) { return `${displayName} must be ${options.length} characters long` },
  getIsRangeMessage: function (displayName, options) { return `${displayName} must be between ${options.min} and ${options.max} characters` },
  getIsLessThanLengthMessage: function (displayName, options) { return `${displayName} must be shorter than ${options.length} characters` },
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
  getExpiredSession: 'Your session has expired, please enter your reference number and date of birth again',
  getExpiredSessionDOB: 'Your session has expired, please enter your date of birth again',
  getMadeClaimForPrisonerBeforeIsRequired: 'You must confirm if you have made a claim before',
  getNoUpdatesMade: 'No updates were made, please ensure all documents are uploaded for your application to be processed or send a message to your caseworker. Otherwise press cancel to return to your claims',
  getInvalidReference: 'Reference is invalid',
  getMalwareDetected: 'We have detected a virus in this file and can not accept it. Please upload a virus free version.',
  getNoExpensesClaimedFor: function () { return 'All expenses were removed, add an expense to continue' },
  getEnterYourDateOfBirth: function () { return 'Enter your date of birth' },
  getBenefitRequired: function () { return 'Choose a benefit from the list' },
  getBenefitOwnerRequired: function () { return 'You must confirm if you are the benefit owner' },
  getEnterPrisonerFirstName: function () { return 'Enter the prisoner\'s first name' },
  getEnterPrisonerLastName: function () { return 'Enter the prisoner\'s last name' },
  getEnterPrisonerDateOfBirth: function () { return 'Enter the prisoner\'s date of birth' },
  getEnterPrisonerNumber: function () { return 'Enter a prisoner number' },
  getEnterPrison: function () { return 'Enter the name of the prison' },
  getEnterYourFirstName: function () { return 'Enter your first name' },
  getEnterYourLastName: function () { return 'Enter your last name' },
  getEnterYourNINNumber: function () { return 'Enter your National Insurance number' },
  getEnterYourHouseNumber: function () { return 'Enter your house number and street' },
  getEnterYourTown: function () { return 'Enter your town' },
  getEnterYourCounty: function () { return 'Enter your county' },
  getEnterYourPostcode: function () { return 'Enter your postcode' },
  getSelectACountry: function () { return 'Select a country' },
  getEnterYourEmailAddress: function () { return 'Enter your email address' },
  getEnterDateOfVisit: function () { return 'Enter the date of your prison visit' },
  getClaimingForEscort: function () { return 'Tell us if you are claiming for an escort' },
  getEnterEscortFirstName: function () { return 'Enter the escort\'s first name' },
  getEnterEscortLastName: function () { return 'Enter the escort\'s last name' },
  getEnterEscortDateOfBirth: function () { return 'Enter the escort\'s date of birth' },
  getEnterEscortNINumber: function () { return 'Enter the escort\'s National Insurance number' },
  getClaimingForChild: function () { return 'Tell us if you are claiming for any children' },
  getEnterChildFirstName: function () { return 'Enter the child\'s first name' },
  getEnterChildLastName: function () { return 'Enter the child\'s last name' },
  getEnterChildDateOfBirth: function () { return 'Enter the child\'s date of birth' },
  getEnterChildRelationship: function () { return 'Enter the child\'s relationship' },
  getSelectAnExpense: function () { return 'Tell us which transport and other expenses you want to claim for' },
  getEnterCost: function () { return 'Enter the cost' },
  getEnterTollCost: function () { return `Enter the cost of the toll` },
  getEnterParkingCost: function () { return `Enter the cost of the parking charge` },
  getEnterFrom: function () { return 'Enter the journey start point' },
  getEnterTo: function () { return 'Enter the journey end point' },
  getReturn: function () { return 'Tell us if this is a return journey' },
  getTicketOwner: function () { return 'Tell us whose ticket you are claiming for' },
  getEnterDepartureTime: function () { return 'Enter the departure time' },
  getEnterNumberOfDays: function () { return 'Enter the number of days for car hire' },
  getTicketType: function () { return 'Tell us what type of ticket you are claiming for' },
  getEnterNightsStayed: function () { return 'Enter the number of nights stayed' },
  getDocumentOnSummary: function (displayName) { return `Add your ${displayName.toLowerCase()} now or choose to send it later` },
  getDocumentNeeded: function (displayName) { return `${displayName} needed` },
  getEnterAccountNumber: function () { return 'Enter your account number' },
  getEnterSortCode: function () { return 'Enter your sortcode' },
  getDisclaimer: function () { return 'You must agree to the declaration to finish your application' },
  getEnterReference: function () { return 'Enter your reference number' },
  getPrisonerNameLessThanLengthMessage: function (displayName, options) { return `Prisoner's ${displayName.toLowerCase()} must be shorter than ${options.length} characters` },
  getClaimantNameLessThanLengthMessage: function (displayName, options) { return `Your ${displayName.toLowerCase()} must be shorter than ${options.length} characters` },
  getEscortNameLessThanLengthMessage: function (displayName, options) { return `Escort's ${displayName.toLowerCase()} must be shorter than ${options.length} characters` },
  getChildNameLessThanLengthMessage: function (displayName, options) { return `Child's ${displayName.toLowerCase()} must be shorter than ${options.length} characters` },
  getIsLengthDigitsMessage: function (displayName, options) { return `${displayName} must be ${options.length} digits long` },
  getIsValidReference: function () { return 'Reference can only contain numbers and letters' },
  getFutureDateSetDaysAway: function (displayName, options) { return `${displayName} must be in the next ${options.days} days` },
  getPastDateSetDaysAway: function (displayName, options) { return `${displayName} must be in the last ${options.days} days. To continue enter a valid visit date in the last ${options.days} days` },
  getUploadRequired: function () { return 'Upload your document now or choose to send it later' },
  getEnterReturnTime: function () { return 'Enter the return time of your train home' },
  getPaymentMethod: function () { return 'Tell us how you want to be paid' },
  getNewCarDestination: function () { return 'Enter the destination of your car journey' },
  getIsIntegerFormat: function (displayName) { return `${displayName} must be a whole number` },
  getValueIsTooLarge: function (displayName) { return `${displayName} value is too large for this field` },
  getExpenseDisabled: function () { return 'You cannot upload a document for this expense as it has already been deleted' },
  getIsPhoneNumberLessThanLengthMessage: function (displayName, options) { return `${displayName} must be ${options.length} characters or less` },
  getCostIsTooLarge: function (displayName, options) { return `${displayName} must be £${options.cost} or less` }
}
