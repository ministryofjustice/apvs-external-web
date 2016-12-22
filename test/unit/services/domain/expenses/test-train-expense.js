const TrainExpense = require('../../../../../app/services/domain/expenses/train-expense')
const ValidationError = require('../../../../../app/services/errors/validation-error')
const expect = require('chai').expect

describe('services/domain/expenses/train-expense', function () {
  const VALID_COST = '20'
  const VALID_FROM = 'some from'
  const VALID_TO = 'some to'
  const VALID_IS_RETURN = 'yes'
  const VALID_TICKET_OWNER = 'you'
  const INVALID_COST = '0'

  const INVALID_CHARS_FROM = '&lt>><somewhere<>>>>&gt'
  const INVALID_CHARS_TO = '&><>To somewhere<&gt<>'

  it('should construct a domain object given valid input', function () {
    var expense = new TrainExpense(
      VALID_COST,
      VALID_FROM,
      VALID_TO,
      VALID_IS_RETURN,
      VALID_TICKET_OWNER
    )
    expect(expense.cost).to.equal(VALID_COST)
    expect(expense.from).to.equal(VALID_FROM)
    expect(expense.to).to.equal(VALID_TO)
    expect(expense.isReturn).to.equal(VALID_IS_RETURN)
    expect(expense.ticketOwner).to.equal(VALID_TICKET_OWNER)
  })

  it('should strip illegal characters from otherwise valid input', function () {
    const unsafeInputPattern = new RegExp(/>|<|&lt|&gt/g)
    var expense = new TrainExpense(
      VALID_COST,
      INVALID_CHARS_FROM,
      INVALID_CHARS_TO,
      VALID_IS_RETURN,
      VALID_TICKET_OWNER
    )
    expect(expense.cost).to.equal(VALID_COST)
    expect(expense.from).to.equal(INVALID_CHARS_FROM.replace(unsafeInputPattern, ''))
    expect(expense.to).to.equal(INVALID_CHARS_TO.replace(unsafeInputPattern, ''))
    expect(expense.isReturn).to.equal(VALID_IS_RETURN)
    expect(expense.ticketOwner).to.equal(VALID_TICKET_OWNER)
  })

  it('should throw an error if passed invalid data', function () {
    expect(function () {
      new TrainExpense(
        INVALID_COST,
        VALID_FROM,
        VALID_TO,
        VALID_IS_RETURN,
        VALID_TICKET_OWNER
      ).isValid()
    }).to.throw(ValidationError)
  })
})
