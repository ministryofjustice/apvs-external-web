const routeHelper = require('../../helpers/routes/route-helper')
const supertest = require('supertest')
const proxyquire = require('proxyquire')
const sinon = require('sinon')

describe('routes/application-submitted', function () {
  const ROUTE = '/application-submitted'
  let app
  let urlPathValidatorStub

  beforeEach(function () {
    urlPathValidatorStub = sinon.stub()

    const route = proxyquire('../../../app/routes/application-submitted', {
      '../services/validators/url-path-validator': urlPathValidatorStub
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

    it('should respond with a 200', function () {
      return supertest(app)
        .get(ROUTE)
        .expect(200)
    })
  })
})
