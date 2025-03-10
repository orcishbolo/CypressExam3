/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

class MotorcycleForm {

  navigateToMotorcyleForm () {
    cy.get('#tricentis_logo').should('be.visible')
    cy.step('Navigate to Motorcyle Form')
    cy.get('#nav_motorcycle').click()
  }

  fillVehicleDataInvalid() {
    cy.get('.fullwidth-block > .container').should('be.visible') //verify form is loaded
    cy.get('#make').select('Honda')
    cy.get('#model').select('Motorcycle')

    cy.get('#cylindercapacity').type(faker.lorem.word())
    cy.get('#cylindercapacity + .error').should('contain', 'Must be a number between 1 and 2000')

    cy.get('#engineperformance').type(faker.lorem.word())
    cy.get('#engineperformance + .error').should('contain', 'Must be a number between 1 and 2000')

    cy.get('#dateofmanufacture').type('3123123123')
    cy.get('#opendateofmanufacturecalender + .error').should('contain', 'Must be a valid date')

    cy.get('#numberofseatsmotorcycle').select('2')
    cy.get('#listprice').type(faker.lorem.word())
    cy.get('#listprice + .error').should('contain', 'Must be a number between 500 and 100000')

    cy.get('#annualmileage').type(faker.lorem.word())
    cy.get('#annualmileage + .error').should('contain', 'Must be a number between 100 and 100000')
  }

  fillVehicleDataValid() {
    cy.get('#cylindercapacity').clear().type(faker.number.int({ min: 10, max: 2000 }).toString())
    cy.get('#engineperformance').clear().type(faker.number.int({ min: 10, max: 2000 }).toString())
    cy.get('#dateofmanufacture').clear().type('02/01/2022')
    cy.get('#listprice').clear().type(faker.number.int({ min: 1000, max: 10000 }).toString())
    cy.get('#annualmileage').clear().type(faker.number.int({ min: 1000, max: 50000 }).toString())
    cy.get('#entervehicledata> .counter').should('have.text', '0') //verify counter is 0
    cy.get('#nextenterinsurantdata').click()
    
  }

  fillInsuranceDataInvalid() {
    cy.get('#firstname').type(faker.number.int({ min: 0, max: 9 }).toString())
    cy.get('#firstname + .error').should('contain', 'Must be at least 2 characters long and must only contain letters')

    cy.get('#lastname').type(faker.number.int({ min: 0, max: 9 }).toString())
    cy.get('#lastname + .error').should('contain', 'Must be at least 2 characters long and must only contain letters')

    cy.get('#birthdate').type('3123123123')
    cy.get('#opendateofbirthcalender + .error').should('contain', 'Must be a valid date')

    cy.get('#zipcode').type(faker.lorem.word())
    cy.get('#zipcode + .error').should('contain', 'Must be only digits')

    cy.get(`.idealforms-field-checkbox:contains('Speeding')`).click().click()
    cy.get('.idealforms-field-checkbox.invalid').should('be.visible')

    cy.get('#website').type(faker.lorem.word())
    cy.get('#website + .error').should('contain', 'Must be a valid URL')
  }

  fillInsuranceDataValid() {
    cy.get('#firstname').clear().type(faker.person.firstName())
    cy.get('#lastname').clear().type(faker.person.lastName().replace(/[^a-zA-Z]/g, ''))
    cy.get(`.idealforms-field-checkbox:contains('Speeding')`).click()
    cy.get('#birthdate').clear().type('01/01/1990')
    cy.get(`.ideal-radiocheck-label:contains('Male')`).click()
    cy.get('#streetaddress').type(faker.address.streetAddress())
    cy.get('#country').select('Philippines')
    cy.get('#zipcode').clear().type(faker.location.zipCode('#####'))
    cy.get('#city').clear().type(faker.location.city())
    cy.get('#occupation').select('Employee')
    cy.get('#website').clear().type(`https://${faker.internet.domainName()}`)
    cy.get('#enterinsurantdata > .counter').should('have.text', '0') //verify counter is 0
    cy.get('#nextenterproductdata').click()
  }

  fillProductDataInvalid() {
    cy.get('#startdate').type('3123123123')
    cy.get('#openstartdatecalender + .error').should('contain', 'Must be a valid date')

    cy.get(`.idealforms-field-checkbox:contains('Euro Protection')`).click()
    cy.get(`.idealforms-field-checkbox:contains('Euro Protection')`).click()
    cy.get('.idealforms-field-checkbox.invalid').should('contain', 'Select at least 1 option')
  }

  fillProductDataValid() {
    cy.get('#insurancesum').select('3.000.000,00')
    cy.get('#damageinsurance').select('Full Coverage')
    cy.get(`.idealforms-field-checkbox:contains('Euro Protection')`).click()

    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 45)
    const formattedDate = `${(futureDate.getMonth() + 1).toString().padStart(2, '0')}/${futureDate.getDate().toString().padStart(2, '0')}/${futureDate.getFullYear()}`
    cy.get('#startdate').clear().type(formattedDate)
    cy.get('#enterproductdata > .counter').should('have.text', '0') //verify counter is 0
    cy.get('#nextselectpriceoption').click()
  }

  selectPriceOption() {
    cy.get('#priceTable').should('be.visible')
    cy.get('input#selectplatinum + .ideal-radio').click()
    cy.wait(3000)
    cy.get('#selectpriceoption > .counter').should('have.text', '0') //verify counter is 0
    cy.get('#viewquote').click() //it doesn't route to Send Quote page
    cy.get('#LoadingPDF').should('be.visible')
  }

  fillSendQuoteInvalid() {
    cy.get('#xLoaderQuote').should('be.visible')
    cy.get('#selectpriceoption').click()
    cy.get('#nextsendquote').click()
    cy.get('#email').type(faker.lorem.word())
    cy.get('#email + .error').should('contain', 'Must be at least a valid email format')

    cy.get('#phone').type(faker.lorem.word())
    cy.get('#phone + .error').should('contain', 'Must be only digit')

    cy.get('#username').type(faker.lorem.word()).clear()
    cy.get('#username + .error').should('be.visible')

    cy.get('#password').type('faker')
    cy.get('#password + .error').should('contain', 'Must be at least 6 characters long, and contain at least one number, one uppercase and one lowercase letter')

    cy.get('#confirmpassword').type(faker.lorem.word())
    cy.get('#confirmpassword + .error').should('contain', 'Must have the same value as the Password field')
  }

  fillSendQuoteValid() {
    cy.get('#email').clear().type(faker.internet.email())
    cy.get('#phone').clear().type('63' + faker.phone.number({ style: 'national' }).replace(/[^0-9]/g, ''))
    cy.get('#username').clear().type(faker.internet.userName().replace(/-/g, ''))
    cy.get('#password').clear().type('P@$$wOrd123')
    cy.get('#confirmpassword').clear().type('P@$$wOrd123')
    cy.get('#Comments').clear().type(faker.lorem.sentence())
    cy.get('#sendquote > .counter').should('have.text', '0') //verify counter is 0
    cy.get('#sendemail').click()
  }

  verifySuccessMessage() {
    cy.get('.sweet-alert h2').should('contain', 'Sending e-mail success!')
  }
}

export default new MotorcycleForm();