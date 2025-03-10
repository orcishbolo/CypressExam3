/// <reference types="cypress" />
import AutomobileForm from '../page-objects/automobile-quote'

describe('Automobile Form Validation', () => {
  beforeEach(() => {
    cy.visit('/')
  })


    it('Should fill the automobile form with invalid and valid data', () => {
      AutomobileForm.navigateToAutomobileForm()
      AutomobileForm.fillVehicleDataValid()
      AutomobileForm.fillInsuranceDataValid()
      AutomobileForm.fillProductDataValid()
      AutomobileForm.selectPriceOption()
      AutomobileForm.fillSendQuoteInvalid()
      AutomobileForm.fillSendQuoteValid()
      AutomobileForm.verifySuccessMessage()
    })
})