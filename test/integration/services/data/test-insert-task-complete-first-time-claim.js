const expect = require('chai').expect
const moment = require('moment')
const taskHelper = require('../../../helpers/data/task-helper')

describe('services/data/insert-task-complete-first-time-claim', function () {
  const REFERENCE = 'COMFTC1'
  const CLAIM_ID = 124

  it('should insert a new task to complete the first time claim', function () {
    return taskHelper.insert(REFERENCE, CLAIM_ID)
      .then(function () {
        return taskHelper.get(REFERENCE, CLAIM_ID)
      })
      .then(function (task) {
        expect(task.Task).to.equal(taskHelper.TASK)
        expect(task.Reference).to.equal(REFERENCE)
        expect(task.ClaimId).to.equal(CLAIM_ID)
        expect(task.DateCreated).to.be.within(
          moment().add(-2, 'minutes').toDate(),
          moment().add(2, 'minutes').toDate())
        expect(task.Status).to.equal(taskHelper.STATUS)
      })
  })

  after(function () {
    return taskHelper.delete(REFERENCE, CLAIM_ID)
  })
})
