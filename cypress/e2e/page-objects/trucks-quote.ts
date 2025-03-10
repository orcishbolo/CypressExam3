/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

class TruckForm {

  navigateToTruckForm() {
    cy.get('#tricentis_logo').should('be.visible')
    cy.step('Navigate to Truck Form')
    cy.get('#nav_truck').click()
  }

  fillVehicleDataValid() {
    cy.get('#make').select('Suzuki')
    cy.get('#numberofseats').select('4')
    cy.get('#fuel').select('Diesel')
    cy.get('#engineperformance').clear().type(faker.number.int({ min: 10, max: 500 }).toString())
    cy.get('#dateofmanufacture').clear().type('02/01/2022')
    cy.get('#payload').clear().type(faker.number.int({ min: 100, max: 1000 }).toString())
    cy.get('#totalweight').clear().type(faker.number.int({ min: 1000, max: 50000 }).toString())
    cy.get('#listprice').clear().type(faker.number.int({ min: 1000, max: 10000 }).toString())
    cy.get('#licenseplatenumber').type(faker.string.alphanumeric(9))
    cy.get('#annualmileage').clear().type(faker.number.int({ min: 1000, max: 50000 }).toString())
    cy.get('#entervehicledata> .counter').should('have.text', '0') //verify counter is 0
    cy.get('#nextenterinsurantdata').click()
    
  }

  fillInsuranceDataValid() {
    const filepath = 'sample image.png'
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
    cy.get('#picturecontainer').attachFile(filepath)
    cy.wait(3000)
    cy.get('input#picture[title="sample image.png"]').should('be.visible')
    cy.get('#enterinsurantdata > .counter').should('have.text', '0') //verify counter is 0
    cy.get('#nextenterproductdata').click()
  }

  fillProductDataValid() {
    cy.get('#insurancesum').select('10.000.000,00')
    cy.get('#damageinsurance').select('Full Coverage')
    cy.get(`.idealforms-field-checkbox:contains('Euro Protection')`).click()

    const futureDate = new Date() //for adding next month date
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

export default new TruckForm();