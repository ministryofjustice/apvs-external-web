exports.up = function (knex, Promise) {
  return knex.schema.createTable('ClaimExpense', function (table) {
    table.increments('ClaimExpenseId')
    table.integer('EligibilityId').unsigned().notNullable()
    table.string('Reference', 10).notNullable().index()
    table.integer('ClaimId').unsigned().notNullable()
    table.string('ExpenseType', 100).notNullable()
    table.decimal('Cost').notNullable()
    table.string('TravelTime', 100)
    table.string('From', 100)
    table.string('To', 100)
    table.boolean('IsReturn')
    table.integer('DurationOfTravel')
    table.string('TicketType', 100)
    table.boolean('IsChild')
    table.boolean('IsEnabled')
  })
  .then(function () {
    return knex.schema.alterTable('ClaimExpense', function (table) {
      table
        .foreign(['ClaimId', 'EligibilityId', 'Reference'])
        .references(['Claim.ClaimId', 'Claim.EligibilityId', 'Claim.Reference'])
    })
  })
  .catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('ClaimExpense')
    .catch(function (error) {
      console.log(error)
      throw error
    })
}
