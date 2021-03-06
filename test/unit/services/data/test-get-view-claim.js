const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const REFERENCE = 'V123456'
const CLAIMID = 1234
const DOB = '10-10-1990'
const ELIGIBILITYID = 1234

describe('services/data/get-view-claim', function () {
  let getViewClaim
  let getRepeatEligibilityStub
  let getClaimExpenseByIdOrLastApprovedStub
  let getClaimChildrenByIdOrLastApprovedStub
  let getHistoricClaimByClaimIdStub
  let getClaimDocumentsHistoricClaimStub
  let getAllClaimDocumentsByClaimIdStub
  let getClaimEventsStub
  let sortViewClaimResultsHelperStub

  before(function () {
    getRepeatEligibilityStub = sinon.stub().resolves([[]])
    getClaimExpenseByIdOrLastApprovedStub = sinon.stub().resolves([])
    getClaimChildrenByIdOrLastApprovedStub = sinon.stub().resolves([])
    getHistoricClaimByClaimIdStub = sinon.stub().resolves([{ EligibilityId: ELIGIBILITYID }])
    getClaimDocumentsHistoricClaimStub = sinon.stub().resolves([])
    getAllClaimDocumentsByClaimIdStub = sinon.stub().resolves([])
    getClaimEventsStub = sinon.stub().resolves([])
    sortViewClaimResultsHelperStub = sinon.stub().returns([])

    getViewClaim = proxyquire('../../../../app/services/data/get-view-claim', {
      './get-repeat-eligibility': getRepeatEligibilityStub,
      './get-claim-expense-by-id-or-last-approved': getClaimExpenseByIdOrLastApprovedStub,
      './get-claim-children-by-id-or-last-approved': getClaimChildrenByIdOrLastApprovedStub,
      './get-historic-claim-by-claim-id': getHistoricClaimByClaimIdStub,
      './get-claim-documents-historic-claim': getClaimDocumentsHistoricClaimStub,
      './get-all-claim-documents-by-claim-id': getAllClaimDocumentsByClaimIdStub,
      './get-claim-events': getClaimEventsStub,
      '../helpers/sort-view-claim-results-helper': sortViewClaimResultsHelperStub
    })
  })

  it('should call each data call, then return sorted results', function () {
    return getViewClaim(CLAIMID, REFERENCE, DOB)
      .then(function (result) {
        expect(getRepeatEligibilityStub.calledWith(REFERENCE, DOB, null)).to.be.true  //eslint-disable-line
        expect(getClaimExpenseByIdOrLastApprovedStub.calledWith(REFERENCE, null, CLAIMID)).to.be.true  //eslint-disable-line
        expect(getClaimChildrenByIdOrLastApprovedStub.calledWith(REFERENCE, null, CLAIMID)).to.be.true  //eslint-disable-line
        expect(getHistoricClaimByClaimIdStub.calledWith(REFERENCE, DOB, CLAIMID)).to.be.true  //eslint-disable-line
        expect(getClaimDocumentsHistoricClaimStub.calledWith(REFERENCE, ELIGIBILITYID, CLAIMID)).to.be.true  //eslint-disable-line
        expect(getAllClaimDocumentsByClaimIdStub.calledWith(CLAIMID, REFERENCE, ELIGIBILITYID)).to.be.true  //eslint-disable-line
        sinon.assert.calledOnce(sortViewClaimResultsHelperStub)
      })
  })
})
