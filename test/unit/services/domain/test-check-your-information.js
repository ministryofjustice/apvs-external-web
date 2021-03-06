const CheckYourInformation = require('../../../../app/services/domain/check-your-information')
const expect = require('chai').expect

describe('services/domain/check-your-information', function () {
  it('should construct a domain object given valid input', function () {
    const checkYourInformation = new CheckYourInformation('true')
    expect(checkYourInformation.confirmCorrect).to.equal('true')
  })

  it('should throw an error if passed invalid data', function () {
    expect(function () {
      new CheckYourInformation(null).isValid()
    }).to.throw()
  })
})
