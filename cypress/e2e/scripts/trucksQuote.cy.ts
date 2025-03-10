/// <reference types="cypress" />
import TruckForm from '../page-objects/trucks-quote'

describe('Truck Form Validation', () => {
  beforeEach(() => {
    cy.visit('/')
  })


    it('Should fill the truck form with invalid and valid data', () => {
      TruckForm.navigateToTruckForm()
      TruckForm.fillVehicleDataValid()
      TruckForm.fillInsuranceDataValid()
      TruckForm.fillProductDataValid()
      TruckForm.selectPriceOption()
      TruckForm.fillSendQuoteInvalid()
      TruckForm.fillSendQuoteValid()
      TruckForm.verifySuccessMessage()
    })
})