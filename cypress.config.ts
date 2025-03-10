import { defineConfig } from "cypress"

export default defineConfig({
  defaultCommandTimeout: 150000,

  e2e: {
    setupNodeEvents(on, config) {
      
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: "https://sampleapp.tricentis.com/101",
    chromeWebSecurity: false,
    viewportHeight: 1080,
    viewportWidth: 1920
    
    
  },
})