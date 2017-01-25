const NewClaim = require('../../../../app/services/domain/new-claim')
const ValidationError = require('../../../../app/services/errors/validation-error')
const dateFormatter = require('../../../../app/services/date-formatter')
const booleanSelectEnum = require('../../../../app/constants/boolean-select-enum')
const expect = require('chai').expect

var claim

describe('services/domain/new-claim', function () {
  const VALID_REFERENCE = 'APVS123'
  const VALID_DAY = dateFormatter.now().date()
  const VALID_MONTH = dateFormatter.now().month() + 1 // Needed for zero indexed month
  const VALID_YEAR = dateFormatter.now().year()
  const VALID_CHILD_VISITOR = booleanSelectEnum.YES
  const VALID_IS_ADVANCE_CLAIM = false

  var expectedDateOfJourney = dateFormatter.build(VALID_DAY, VALID_MONTH, VALID_YEAR)

  it('should construct a domain object given valid input', function () {
    claim = new NewClaim(
      VALID_REFERENCE,
      VALID_DAY,
      VALID_MONTH,
      VALID_YEAR,
      VALID_IS_ADVANCE_CLAIM
    )
    expect(claim.reference).to.equal(VALID_REFERENCE)
    expect(claim.dateOfJourney).to.be.within(
      expectedDateOfJourney.subtract(1, 'seconds').toDate(),
      expectedDateOfJourney.add(1, 'seconds').toDate()
    )
    expect(claim.isAdvanceClaim).to.equal(VALID_IS_ADVANCE_CLAIM)
  })

  it('should return isRequired errors given empty strings', function () {
    expect(function () {
      new NewClaim('', '', '', '', false).isValid()
    }).to.throw(ValidationError)
  })

  it('should not return isRequired errors for child-visitor if is repeat duplicate claim', function () {
    claim = new NewClaim(VALID_REFERENCE, VALID_DAY, VALID_MONTH, VALID_YEAR, '', true, VALID_IS_ADVANCE_CLAIM)
    expect(claim, 'should not throw a ValidationError').to.be.instanceof(NewClaim)
  })

  it('should return isValidDate error given an invalid type for date', function () {
    expect(function () {
      new NewClaim(
        VALID_REFERENCE,
        'invalid day',
        'invalid month',
        'invalid year',
        '',
        false,
        VALID_IS_ADVANCE_CLAIM
      ).isValid()
    }).to.throw(ValidationError)
  })

  it('should return isValidDate error given a date in the future for non-advance claims', function () {
    var futureDate = dateFormatter.now().add(1, 'days')
    expect(function () {
      new NewClaim(
        VALID_REFERENCE,
        futureDate.date(),
        futureDate.month() + 1,
        futureDate.year(),
        VALID_IS_ADVANCE_CLAIM
      ).isValid()
    }).to.throw(ValidationError)
  })

  it('should return isValidDate error given a date in the future for advance claims', function () {
    var isAdvanceClaim = true
    var pastDate = dateFormatter.now().add(-1)
    expect(function () {
      new NewClaim(
        VALID_REFERENCE,
        pastDate.date(),
        pastDate.month() + 1,
        pastDate.year(),
        VALID_CHILD_VISITOR,
        false,
        isAdvanceClaim
      ).isValid()
    }).to.throw(ValidationError)
  })

  it('should return isValidDate error given a date less than 5 days away for advance claims', function () {
    var isAdvanceClaim = true
    var futureDate = dateFormatter.now().add(4, 'days')
    expect(function () {
      new NewClaim(
        VALID_REFERENCE,
        futureDate.date(),
        futureDate.month() + 1,
        futureDate.year(),
        VALID_CHILD_VISITOR,
        false,
        isAdvanceClaim
      ).isValid()
    }).to.throw(ValidationError)
  })

  it('should return isDateWithinDays error given a date more than 28 days away', function () {
    var dateFurtherThan28Days = dateFormatter.now().subtract(29, 'days')
    expect(function () {
      new NewClaim(
        VALID_REFERENCE,
        dateFurtherThan28Days.date(),
        dateFurtherThan28Days.month() + 1,
        dateFurtherThan28Days.year(),
        VALID_IS_ADVANCE_CLAIM
      ).isValid()
    }).to.throw(ValidationError)
  })
})
