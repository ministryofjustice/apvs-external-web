const expect = require('chai').expect
const eligiblityHelper = require('../../../helpers/data/eligibility-helper')
const claimHelper = require('../../../helpers/data/claim-helper')
const visitorHelper = require('../../../helpers/data/visitor-helper')
const claimTypeEnum = require('../../../../app/constants/claim-type-enum')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const MASKED_ADDRESS = {PostCode: '****3BT'}
var getRepeatEligibilityStub

var getAddress

const REFERENCE = 'V123456'
var eligibilityId
var claimId

describe('services/data/get-claim-summary', function () {
  describe('first time claim', function () {
    before(function () {
      getRepeatEligibilityStub = sinon.stub().resolves(MASKED_ADDRESS)
      getAddress = proxyquire('../../../../app/services/data/get-address', {
        './get-repeat-eligibility': getRepeatEligibilityStub
      })
      return eligiblityHelper.insertEligibilityVisitorAndPrisoner(REFERENCE)
        .then(function (newEligibilityId) {
          eligibilityId = newEligibilityId
          return claimHelper.insert(REFERENCE, eligibilityId)
            .then(function (newClaimId) {
              claimId = newClaimId
            })
        })
    })

    it('should return an unmasked address', function () {
      return getAddress(REFERENCE, claimId, claimTypeEnum.FIRST_TIME)
        .then(function (address) {
          expect(address.HouseNumberAndStreet).to.equal(visitorHelper.HOUSE_NUMBER_AND_STREET)
          expect(address.Town).to.equal(visitorHelper.TOWN)
          expect(address.PostCode).to.equal(visitorHelper.POST_CODE)
        })
    })

    it('should call getRepeatEligibility and return masked data', function () {
      return getAddress(REFERENCE, claimId, claimTypeEnum.REPEAT_CLAIM)
        .then(function (maskedAddress) {
          expect(getRepeatEligibilityStub.calledOnce).to.be.true
          expect(maskedAddress.PostCode).to.equal(MASKED_ADDRESS.PostCode)
        })
    })

    after(function () {
      return eligiblityHelper.deleteAll(REFERENCE)
    })
  })
})