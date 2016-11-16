const expect = require('chai').expect
const UrlPathValidator = require('../../../../app/services/validators/url-path-validator')
const claimTypeEnum = require('../../../../app/constants/claim-type-enum')

describe('services/validators/url-path-validator', function () {
  const VALID_CLAIM_TYPE = { claimType: claimTypeEnum.FIRST_TIME }
  const INVALID_CLAIM_TYPE = { claimType: 'invalid' }

  const VALID_DOB = { dob: '1989-04-11' }
  const INVALID_DOB = { dob: 'invalid' }

  const VALID_RELATIONSHIP = { relationship: 'partner' }
  const INVALID_RELATIONSHIP = { relationship: 'invalid' }

  const VALID_BENEFIT = { benefit: 'income-support' }
  const INVALID_BENEFIT = { benefit: 'invalid' }

  const VALID_REFERENCE = { reference: '49CCADM' }
  const INVALID_REFERENCE = { reference: 'invalid' }

  const VALID_CLAIMID = { claimId: '123' }
  const INVALID_CLAIMID = { claimId: 'invalid' }

  const VALID_REFERENCEID = { referenceId: '49CCADM-4321' }
  const INVALID_REFERENCEID = { referenceId: '49CCADM1XXX' }

  const VALID_CLAIM_DOCUMENT_ID = { claimId: '123' }
  const INVALID_CLAIM_DOCUMENT_ID = { claimId: 'invalid' }

  it('should throw error if passed null', function () {
    expect(function () {
      UrlPathValidator(null)
    }).to.throw(TypeError)
  })

  it('should throw error if passed undefined', function () {
    expect(function () {
      UrlPathValidator(undefined)
    }).to.throw(TypeError)
  })

  it('should throw Error if passed an invalid claimType value', function () {
    expect(function () {
      UrlPathValidator(INVALID_CLAIM_TYPE)
    }).to.throw(Error)
  })

  it('should throw Error if passed an invalid dob value', function () {
    expect(function () {
      UrlPathValidator(INVALID_DOB)
    }).to.throw(Error)
  })

  it('should throw Error if passed an invalid relationship value', function () {
    expect(function () {
      UrlPathValidator(INVALID_RELATIONSHIP)
    }).to.throw(Error)
  })

  it('should throw Error if passed an invalid benefit value', function () {
    expect(function () {
      UrlPathValidator(INVALID_BENEFIT)
    }).to.throw(Error)
  })

  it('should throw Error if passed an invalid reference value', function () {
    expect(function () {
      UrlPathValidator(INVALID_REFERENCE)
    }).to.throw(Error)
  })

  it('should throw Error if passed an invalid claimId value', function () {
    expect(function () {
      UrlPathValidator(INVALID_CLAIMID)
    }).to.throw(Error)
  })

  it('should throw Error if passed an invalid referenceId value', function () {
    expect(function () {
      UrlPathValidator(INVALID_REFERENCEID)
    }).to.throw(Error)
  })

  it('should throw Error if passed an invalid claimDocumentId value', function () {
    expect(function () {
      UrlPathValidator(INVALID_CLAIM_DOCUMENT_ID)
    }).to.throw(Error)
  })

  it('should return undefined if passed a valid claimType value', function () {
    var result = UrlPathValidator(VALID_CLAIM_TYPE)
    expect(result).to.equal(undefined)
  })

  it('should return undefined if passed a valid dob value', function () {
    var result = UrlPathValidator(VALID_DOB)
    expect(result).to.equal(undefined)
  })

  it('should return undefined if passed a valid relationship value', function () {
    var result = UrlPathValidator(VALID_RELATIONSHIP)
    expect(result).to.equal(undefined)
  })

  it('should return undefined if passed a valid dob value', function () {
    var result = UrlPathValidator(VALID_DOB)
    expect(result).to.equal(undefined)
  })

  it('should return undefined if passed a valid benefit value', function () {
    var result = UrlPathValidator(VALID_BENEFIT)
    expect(result).to.equal(undefined)
  })

  it('should return undefined if passed a valid reference value', function () {
    var result = UrlPathValidator(VALID_REFERENCE)
    expect(result).to.equal(undefined)
  })

  it('should return undefined if passed a valid claimId value', function () {
    var result = UrlPathValidator(VALID_CLAIMID)
    expect(result).to.equal(undefined)
  })

  it('should return undefined if passed a valid referenceId value', function () {
    var result = UrlPathValidator(VALID_REFERENCEID)
    expect(result).to.equal(undefined)
  })

  it('should return undefined if passed a valid claimDocumentId value', function () {
    var result = UrlPathValidator(VALID_CLAIM_DOCUMENT_ID)
    expect(result).to.equal(undefined)
  })
})
