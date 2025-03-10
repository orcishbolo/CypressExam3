/// <reference types="cypress" />
import MotorcycleForm from '../page-objects/motorcycle-quote'

describe('Motorcycle Form Validation', () => {
  beforeEach(() => {
    cy.visit('/')
  })


    it('Should fill the motorcycle form with invalid and valid data', () => {
      MotorcycleForm.navigateToMotorcyleForm()
      MotorcycleForm.fillVehicleDataInvalid()
      MotorcycleForm.fillVehicleDataValid()
      MotorcycleForm.fillInsuranceDataInvalid()
      MotorcycleForm.fillInsuranceDataValid()
      MotorcycleForm.fillProductDataInvalid()
      MotorcycleForm.fillProductDataValid()
      MotorcycleForm.selectPriceOption()
      MotorcycleForm.fillSendQuoteInvalid()
      MotorcycleForm.fillSendQuoteValid()
      MotorcycleForm.verifySuccessMessage()
    })
})