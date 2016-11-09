const routeHelper = require('../../../../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

describe('routes/first-time/eligibility/claim/file-upload', function () {
  const ROUTE = `/first-time/eligibility/A123456/claim/1/file-upload?document=`

  var app
  var urlPathValidatorStub

  beforeEach(function () {
    urlPathValidatorStub = sinon.stub()

    var route = proxyquire('../../../../../../app/routes/first-time/eligibility/claim/file-upload', {
      '../../../../services/validators/url-path-validator': urlPathValidatorStub
    })
    app = routeHelper.buildApp(route)
  })

  describe(`GET ${ROUTE}`, function () {
    it('should call the URL Path Validator', function () {
      return supertest(app)
        .get(ROUTE)
        .expect(function () {
          sinon.assert.calledOnce(urlPathValidatorStub)
        })
    })

    it('should respond with a 200 if passed valid document type', function () {
      return supertest(app)
        .get(`${ROUTE}VISIT_CONFIRMATION`)
        .expect(200)
    })

    it('should respond with a 404 if passed invalid document type', function () {
      return supertest(app)
        .get(`${ROUTE}TEST`)
        .expect(404)
    })
  })
})
