// TODO: Will need to add check on each of the pages that has a constructed URL path.

describe('First time claim flow', () => {
  it('should display each page in the first time eligibility flow', () => {
    return browser.url('/')

      // Index
      .waitForExist('#start')
      .click('#start')

      // Start
      .waitForExist('#first-time-submit')
      .click('#first-time-submit')

      // Date of Birth
      .waitForExist('#date-of-birth-submit')
      .setValue('#dob-day-input', '01')
      .setValue('#dob-month-input', '05')
      .setValue('#dob-year-input', '1955')
      .click('#date-of-birth-submit')

      // Prisoner Relationship
      .waitForExist('#prisoner-relationship-submit')
      .click('#partner')
      .click('#prisoner-relationship-submit')

      // Journey Assistance
      .waitForExist('#journey-assistance-submit')
      .click('#assistance-no')
      .click('#journey-assistance-submit')

      // Benefit
      .waitForExist('#benefit-submit')
      .click('#income-support')
      .click('#benefit-submit')

      // About the Prisoner
      .waitForExist('#about-the-prisoner-submit')
      .setValue('#prisoner-first-name', 'Joe')
      .setValue('#prisoner-last-name', 'Bloggs')
      .setValue('#dob-day', '01')
      .setValue('#dob-month', '05')
      .setValue('#dob-year', '1955')
      .setValue('#prisoner-number', 'A1234BC')
      .setValue('#prison-name', 'Hewell')
      .click('#about-the-prisoner-submit')

      // About you
      .waitForExist('#about-you-submit')
      .setValue('#title-input', 'Mr')
      .setValue('#first-name-input', 'Joe')
      .setValue('#last-name-input', 'Bloggs')
      .setValue('#national-insurance-number-input', 'AA123456A')
      .setValue('#house-number-and-street-input', '1')
      .setValue('#town-input', 'Town')
      .setValue('#county-input', 'County')
      .setValue('#post-code-input', 'AA123AA')
      .click('#country-input')
      .waitForExist('#country-ni')
      .click('#country-ni')
      .setValue('#email-address-input', 'test@test.com')
      .setValue('#phone-number-input', '0123456789')
      .click('#about-you-submit')

      // Application Submitted
      .waitForExist('#reference')
  })
})
