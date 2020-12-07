/* eslint-disable no-new */
const UpdatedContactDetails = require('../../../../app/services/domain/updated-contact-details')
const expect = require('chai').expect

describe('services/domain/update-contact-details', function () {
  const VALID_EMAIL = 'test@test.com'
  const VALID_PHONE_NUMBER = '02121 565 654'

  it('should construct a domain object given valid input', function () {
    const updatedContactDetails = new UpdatedContactDetails(VALID_EMAIL, VALID_PHONE_NUMBER)
    expect(updatedContactDetails.emailAddress).to.equal(VALID_EMAIL)
    expect(updatedContactDetails.phoneNumber).to.equal(VALID_PHONE_NUMBER)
  })

  it('should throw a validation error if any inputs were not set and the default domain object values where used', function () {
    expect(function () {
      new UpdatedContactDetails()
    }).to.throw()
  })
})
