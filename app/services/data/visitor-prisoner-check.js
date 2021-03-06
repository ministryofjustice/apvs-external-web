const config = require('../../../knexfile').extweb
const Promise = require('bluebird').Promise
const knex = require('knex')(config)
const dateFormatter = require('../date-formatter')

module.exports = function (day, month, year, eligibilityId) {
  let matched

  return new Promise(function (resolve, reject) {
    getPrisonNumber(eligibilityId)
      .then(function (prisonNumber) {
        getEligibilityIds(day, month, year)
          .then(function (eligibilityIds) {
            getPrisonNumberFromEligibilityId(eligibilityIds)
              .then(function (prisonNumbers) {
                prisonNumbers.forEach(function (number) {
                  if (number === prisonNumber) {
                    matched = true
                    return resolve(matched)
                  } else {
                    matched = false
                  }
                })
                return resolve(matched)
              })
          })
      })
  })
}

function getPrisonNumber (eligibilityId) {
  return knex('Prisoner').where('EligibilityId', eligibilityId).first('PrisonNumber')
    .then(function (result) {
      try {
        return result.PrisonNumber
      } catch (e) {
        return result
      }
    })
}

function getEligibilityIds (day, month, year) {
  const dateOfJourney = dateFormatter.buildFormatted(day, month, year)

  return knex.raw('SELECT * FROM [IntSchema].[getIdsForVisitorPrisonerCheck] (?)', [dateOfJourney])
    .then(function (results) {
      const eligibilityIds = []

      results.forEach(function (result) {
        eligibilityIds.push(result.EligibilityId)
      })

      return eligibilityIds
    })
}

function getPrisonNumberFromEligibilityId (eligibilityIds) {
  return knex('IntSchema.Prisoner').whereIn('EligibilityId', eligibilityIds).select('PrisonNumber')
    .then(function (results) {
      const prisonNumbers = []

      results.forEach(function (result) {
        prisonNumbers.push(result.PrisonNumber)
      })

      return prisonNumbers
    })
}
